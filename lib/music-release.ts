import type { Release } from "@/content/types";

/** Fechas con offset explícito. Una fecha inválida nunca habilita un estreno. */
export function isReleaseAvailable(date: string | undefined, now: number): boolean {
  return !date || (Number.isFinite(Date.parse(date)) && now >= Date.parse(date));
}

/** La preescucha de desarrollo es independiente de la fecha oficial y del álbum. */
export function canPlayReleaseAudio(
  release: Release,
  now: number,
  development = process.env.NODE_ENV === "development"
): boolean {
  return (development && release.audioPreview === true) || isReleaseAvailable(release.releaseDate, now);
}

/** Solo esta selección pública debe pasarse a los componentes del catálogo. */
export function getVisibleReleases(releases: Release[], now: number): Release[] {
  return releases
    .filter((release) => isReleaseAvailable(release.revealAt, now))
    .map((release) => {
      if (release.type !== "single" || canPlayReleaseAudio(release, now)) return release;
      return {
        ...release,
        streamingLinks: {},
        tracks: release.tracks.map((track) => {
          const pendingTrack = { ...track };
          delete pendingTrack.audioUrl;
          delete pendingTrack.spotifyUrl;
          delete pendingTrack.youtubeUrl;
          return pendingTrack;
        }),
      };
    });
}

export function nextMusicReleaseDate(releases: Release[], now: number): string | undefined {
  return releases
    .flatMap((release) => [release.revealAt, release.type === "single" ? release.releaseDate : undefined])
    .filter((date): date is string => typeof date === "string" && Date.parse(date) > now)
    .sort((a, b) => Date.parse(a) - Date.parse(b))[0];
}
