import type { Metadata } from "next";
import Link from "next/link";
import { getMusicRequestTime } from "@/lib/music-release-server";
import { PageHeader } from "@/components/ui/PageHeader";
import { ReleaseCountdown } from "@/components/home/ReleaseCountdown";
import { ReleaseEntry } from "@/components/music/MusicCatalog";
import { ReleaseRefresh } from "@/components/music/ReleaseRefresh";
import { debutAlbum } from "@/content/releases";
import { isReleaseAvailable } from "@/lib/music-release";
import { siteNavigation } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const now = await getMusicRequestTime();
  const available = isReleaseAvailable(debutAlbum.revealAt, now);
  return {
    title: available ? debutAlbum.title : "Próximo álbum",
    description: available ? "9 Peldaños, el álbum de SYNCRO22." : "El próximo álbum de SYNCRO22 se revelará al terminar el countdown.",
  };
}

export default async function AlbumPage() {
  const now = await getMusicRequestTime();
  const available = isReleaseAvailable(debutAlbum.revealAt, now);

  return (
    <>
      <PageHeader index={`${siteNavigation.musica.index}.A`} title={available ? debutAlbum.title : "Próximo álbum"} description={available ? "SYNCRO22" : "Un nuevo capítulo está por llegar."} />
      {!available ? <ReleaseRefresh at={debutAlbum.revealAt} serverNow={now} /> : null}
      <section aria-label={available ? debutAlbum.title : "Estreno del álbum"} className="bg-black py-16 sm:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          {available ? (
            <ReleaseEntry release={debutAlbum} now={now} showAlbumLink={false} lyricContexts={new Map(debutAlbum.tracks.map((track) => [track.id, debutAlbum.id]))} />
          ) : (
            <div className="flex flex-col items-center gap-8 border border-steel bg-ink/60 px-5 py-12 text-center sm:p-16">
              <p className="tech-label text-blood">Estreno del álbum</p>
              {debutAlbum.revealAt ? <ReleaseCountdown releaseDate={debutAlbum.revealAt} /> : null}
              <p className="max-w-lg text-sm leading-relaxed text-fog">La portada y las canciones se revelarán al finalizar el countdown.</p>
            </div>
          )}
          <Link href="/musica" className="tech-label mt-10 inline-flex min-h-11 items-center py-3 text-fog hover:text-blood">← Volver a Música</Link>
        </div>
      </section>
    </>
  );
}
