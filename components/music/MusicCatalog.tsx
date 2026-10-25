import Image from "next/image";
import type { Release, StreamingLinks } from "@/content/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackLyrics } from "./TrackLyrics";
import { AudioPlayer } from "./AudioPlayer";
import { LyricsLink } from "./LyricsLink";
import Link from "next/link";
import { canPlayReleaseAudio, isReleaseAvailable } from "@/lib/music-release";
import { AlbumTeaser } from "./AlbumTeaser";
import { siteNavigation } from "@/lib/site";

const platformNames: Record<keyof StreamingLinks, string> = {
  spotify: "Spotify",
  youtube: "YouTube",
  appleMusic: "Apple Music",
  deezer: "Deezer",
  bandcamp: "Bandcamp",
};

interface ReleaseEntryProps {
  release: Release;
  lyricContexts: Map<string, string>;
  now: number;
  showAlbumLink?: boolean;
}

export function ReleaseEntry({ release, lyricContexts, now, showAlbumLink = true }: ReleaseEntryProps) {
  const isSingle = release.type === "single";
  const displayReleaseDate = release.displayReleaseDate ?? release.releaseDate;
  const isPending = isSingle && !isReleaseAvailable(release.releaseDate, now);
  const canPlayAudio = isSingle && canPlayReleaseAudio(release, now);
  const singleTrack = isSingle && release.tracks.length === 1 ? release.tracks[0] : undefined;
  const existingContext = singleTrack ? lyricContexts.get(singleTrack.id) : undefined;
  const sharedLyricsTarget = singleTrack && existingContext && existingContext !== release.id
    ? `letra-${existingContext}-${singleTrack.id}`
    : undefined;

  return (
    <article id={`lanzamiento-${release.slug}`} className={isSingle ? "min-w-0 scroll-mt-28 border border-steel bg-ink/60 p-5 sm:p-8" : "min-w-0 scroll-mt-28"}>
      <div className={isSingle ? "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12" : "mb-8 flex flex-col gap-8 sm:flex-row sm:items-end"}>
        {release.cover ? (
          <div className={isSingle ? "relative aspect-square w-full max-w-md shrink-0 self-center border border-steel bg-black lg:w-2/5" : "relative aspect-square w-full max-w-64 shrink-0 border border-steel"}>
            <Image src={release.cover} alt={`Portada de ${release.title}`} fill sizes={isSingle ? "(min-width: 1024px) 40vw, (min-width: 640px) 448px, 90vw" : "256px"} className={isSingle ? "object-contain" : "object-cover"} />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="tech-label text-blood">
            {release.featured ? <span className="mb-3 block text-bone">Lanzamiento</span> : null}
            {release.type === "single" ? "Single" : release.type === "ep" ? "EP" : "Disco"}
            {!(isSingle && release.featured) ? <span className="text-fog"> · {release.tracks.length} {release.tracks.length === 1 ? "canción" : "canciones"}</span> : null}
          </p>
          <h3 className={isSingle ? "display-title mt-4 break-words text-4xl text-bone sm:text-5xl lg:text-6xl" : "display-title mt-4 break-words text-4xl text-bone sm:text-6xl lg:text-7xl"}>{release.title}</h3>
          {release.artist ? <p className="tech-label mt-4 text-fog">{release.artist}</p> : null}
          {release.webExclusive ? <p className="tech-label mt-3 text-blood">Exclusivo de la web</p> : null}
          {displayReleaseDate ? (
            <time dateTime={displayReleaseDate} className="mt-4 block font-mono text-xs text-fog">
              {isPending ? "Estreno · " : ""}{new Intl.DateTimeFormat("es-AR", { dateStyle: "long", timeZone: "America/Argentina/Buenos_Aires" }).format(new Date(displayReleaseDate))}
            </time>
          ) : release.year ? <p className="mt-4 text-sm text-fog">{release.year}</p> : null}
          {release.description ? <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-fog">{release.description}</p> : null}
          {singleTrack?.audioUrl && canPlayAudio ? <AudioPlayer src={singleTrack.audioUrl} title={release.title} /> : null}
          {isPending && !canPlayAudio ? <p className="mt-6 border-l border-blood pl-4 text-sm leading-relaxed text-fog">El audio estará disponible a partir del estreno.</p> : null}
          {release.type === "album" && showAlbumLink ? <Link href={`/musica/${release.slug}`} className="tech-label mt-6 inline-flex min-h-11 items-center border-b border-blood py-3 text-bone hover:text-blood">Ver álbum →</Link> : null}
          {singleTrack && sharedLyricsTarget ? <LyricsLink targetId={sharedLyricsTarget} title={singleTrack.title} /> : null}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {Object.entries(release.streamingLinks).map(([platform, href]) => href ? (
              <a key={platform} href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-fog underline decoration-blood underline-offset-4 hover:text-bone">
                {platformNames[platform as keyof StreamingLinks]} ↗
              </a>
            ) : null)}
          </div>
        </div>
      </div>
      {singleTrack && sharedLyricsTarget ? null : release.tracks.length > 0 ? (
        <ol className={isSingle ? "mt-8 min-w-0 border-t border-steel" : "min-w-0 border-t border-steel"} aria-label={`Canciones de ${release.title}`}>
          {[...release.tracks].sort((a, b) => a.trackNumber - b.trackNumber).map((track) => (
            <li key={track.id} className="min-w-0">
              <TrackLyrics song={track} trackNumber={track.trackNumber} context={release.id} />
            </li>
          ))}
        </ol>
      ) : <EmptyState title="Canciones pendientes de carga" />}
    </article>
  );
}

interface MusicCatalogProps {
  releases: Release[];
  now: number;
  albumRevealAt?: string;
}

export function MusicCatalog({ releases, now, albumRevealAt }: MusicCatalogProps) {
  // Los singles reutilizan la letra del disco cuando la canción ya figura allí.
  const lyricContexts = new Map<string, string>();
  const lyricReleases = [...releases.filter((release) => release.type !== "single"), ...releases.filter((release) => release.type === "single")];
  for (const release of lyricReleases) {
    for (const track of release.tracks) {
      if (!lyricContexts.has(track.id)) lyricContexts.set(track.id, release.id);
    }
  }
  const categories = [
    { id: "discos", title: "Discos", index: `${siteNavigation.musica.index}.A`, entries: releases.filter((release) => release.type !== "single") },
    { id: "singles", title: "Singles", index: `${siteNavigation.musica.index}.B`, entries: releases.filter((release) => release.type === "single" && !release.featured) },
  ];
  const featured = releases.filter((release) => release.featured);

  return (
    <div className="relative overflow-hidden bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,4,41,0.08),transparent_55%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 lg:px-8">
        {featured.length > 0 ? (
          <section aria-label="Lanzamiento" className="mb-16 flex flex-col gap-10 pt-10 sm:mb-20 sm:pt-14">
            <h2 className="sr-only">Lanzamiento</h2>
            {featured.map((release) => <ReleaseEntry key={release.id} release={release} lyricContexts={lyricContexts} now={now} />)}
          </section>
        ) : null}
        <nav aria-label="Catálogo de música" className="mb-16 flex flex-wrap gap-x-8 gap-y-4 border-b border-steel pb-6 sm:mb-20">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="tech-label py-2 text-fog transition-colors hover:text-blood">{category.title}</a>
          ))}
        </nav>
        <div className="flex flex-col gap-20 sm:gap-28">
          {categories.map((category) => (
            <section key={category.id} id={category.id} aria-label={category.title} className="min-w-0 scroll-mt-28">
              <SectionHeading index={category.index} title={category.title} className="mb-10" />
              {category.entries.length > 0 ? (
                <div className="flex min-w-0 flex-col gap-16">
                  {category.entries.map((release) => <ReleaseEntry key={release.id} release={release} lyricContexts={lyricContexts} now={now} />)}
                </div>
              ) : category.id === "discos" && albumRevealAt ? <AlbumTeaser releaseDate={albumRevealAt} /> : category.id === "singles" && featured.some((release) => release.type === "single") ? <p className="text-sm text-fog">El single destacado se encuentra al inicio del catálogo.</p> : <EmptyState title={`Sin ${category.title.toLowerCase()} registrados`} description="Los próximos lanzamientos aparecerán aquí." />}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
