import type { Metadata } from "next";
import Link from "next/link";
import { getMusicRequestTime } from "@/lib/music-release-server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReleaseEntry } from "@/components/music/MusicCatalog";
import { debutAlbum } from "@/content/releases";
import { siteNavigation } from "@/lib/site";
import { AlbumPlayer } from "@/components/music/AlbumPlayer";
import { TrackLyrics } from "@/components/music/TrackLyrics";
import { albumAudioUrl } from "@/lib/album-audio";
import { InstagramIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: debutAlbum.title,
  description: "9 Peldaños, el álbum de SYNCRO22.",
};

export default async function AlbumPage() {
  const now = await getMusicRequestTime();

  return (
    <>
      <PageHeader index={`${siteNavigation.musica.index}.A`} title={debutAlbum.title} description="SYNCRO22" />
      <section aria-label={debutAlbum.title} className="relative isolate overflow-clip bg-black py-16 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="sticky top-0 h-dvh w-full">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster={debutAlbum.cover}
                disablePictureInPicture
                disableRemotePlayback
                tabIndex={-1}
                className="h-full w-full object-cover"
              >
                <source src="/album/9-peldanos-fondo-compatible.mp4" type="video/mp4" media="(min-width: 768px) and (prefers-reduced-motion: no-preference)" />
              </video>
              <div className="absolute right-0 bottom-0 h-16 w-32 bg-[radial-gradient(ellipse_at_50%_100%,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.94)_30%,rgba(0,0,0,0.6)_50%,transparent_75%)] sm:h-24 sm:w-48 lg:h-28 lg:w-64" />
            </div>
            <div className="absolute inset-0 bg-black/80" />
          </div>
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <ReleaseEntry
              release={debutAlbum}
              now={now}
              showAlbumLink={false}
              lyricContexts={new Map(debutAlbum.tracks.map((track) => [track.id, debutAlbum.id]))}
              tracklist={
                <>
                  <dl aria-label="Créditos del álbum" className="mb-6 grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-x-8">
                    <div className="min-w-0">
                      <dt className="tech-label text-[0.625rem] leading-relaxed text-blood">Producción, grabación y edición</dt>
                      <dd className="mt-1 text-sm">
                        <a href="https://www.instagram.com/lorentheg_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Lorenzo Guillou Santi (se abre en una pestaña nueva)" className="inline-flex min-h-8 items-center gap-2 font-medium text-bone underline decoration-steel underline-offset-4 transition-colors hover:text-blood">
                          <InstagramIcon className="h-4 w-4 shrink-0" />
                          Lorenzo Guillou Santi
                        </a>
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="tech-label text-[0.625rem] leading-relaxed text-blood">Arte de tapa</dt>
                      <dd className="mt-1 text-sm">
                        <a href="https://www.instagram.com/klaufriaz/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Claudio Frías (se abre en una pestaña nueva)" className="inline-flex min-h-8 items-center gap-2 font-medium text-bone underline decoration-steel underline-offset-4 transition-colors hover:text-blood">
                          <InstagramIcon className="h-4 w-4 shrink-0" />
                          Claudio Frías
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <AlbumPlayer
                    tracks={debutAlbum.tracks.map((track) => ({ id: track.id, title: track.title, audioUrl: albumAudioUrl(track.id) }))}
                    lyrics={debutAlbum.tracks.map((track) => <TrackLyrics key={track.id} song={track} trackNumber={track.trackNumber} context={debutAlbum.id} />)}
                  />
                </>
              }
            />
          <Link href="/musica" className="tech-label mt-10 inline-flex min-h-11 items-center py-3 text-fog hover:text-blood">← Volver a Música</Link>
        </div>
      </section>
    </>
  );
}
