import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { MusicCatalog } from "@/components/music/MusicCatalog";
import { releases } from "@/content/releases";
import { getMusicRequestTime } from "@/lib/music-release-server";
import { getVisibleReleases, nextMusicReleaseDate } from "@/lib/music-release";
import { ReleaseRefresh } from "@/components/music/ReleaseRefresh";
import { siteNavigation } from "@/lib/site";

// Perfil oficial de artista en Spotify. Se abre en pestaña nueva.
const SPOTIFY_ARTIST_URL =
  "https://open.spotify.com/intl-es/artist/6MGPFHFIpWpozKaYWyl9Rm?si=TrjY0eUbTCG-RnooJKmsSQ";

export const metadata: Metadata = {
  title: "Música",
  description: "Discografía de SYNCRO22.",
};

export default async function MusicaPage() {
  const now = await getMusicRequestTime();
  const visibleReleases = getVisibleReleases(releases, now);
  return (
    <>
      <PageHeader
        index={siteNavigation.musica.index}
        title="Música"
        description="Discografía, singles y lanzamientos de SYNCRO22."
      />
      <ReleaseRefresh at={nextMusicReleaseDate(releases, now)} serverNow={now} />
      <MusicCatalog releases={visibleReleases} now={now} />
      <section
        className="relative isolate overflow-hidden bg-ink"
        aria-label="Escuchar a SYNCRO22 en Spotify"
      >
        {/*
          syncroport — fotografía grande en flujo: con su proporción nativa
          (1448×1086) define la altura de la sección, de modo que la escena
          completa de la banda se ve sin recortes agresivos ni deformación.
          El tope de 85vh solo recorta de forma moderada en pantallas muy
          anchas, manteniendo la composición cinematográfica.
        */}
        <Image
          src="/music/syncroport.png"
          alt=""
          width={1448}
          height={1086}
          sizes="100vw"
          className="block h-auto max-h-[85vh] w-full object-cover object-[50%_40%] opacity-65 brightness-65 saturate-55"
        />

        {/* Velos: separan el contenido de la fotografía sin ocultarla */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.45)_0%,rgba(5,5,5,0.2)_40%,rgba(5,5,5,0.4)_65%,rgba(5,5,5,0.85)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,5,0.7)_0%,rgba(5,5,5,0.35)_35%,transparent_60%,rgba(5,5,5,0.55)_100%)]"
        />

        {/* Contenido: Spotify oficial — debajo de la foto en mobile/tablet,
            superpuesto sobre el velo inferior en desktop */}
        <div className="relative z-10 border-t border-steel/40 lg:absolute lg:inset-x-0 lg:bottom-0 lg:border-t-0">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <span className="tech-label text-blood">STREAMING OFICIAL</span>
              <p className="display-title mt-3 max-w-md text-xl text-bone sm:text-2xl">
                ESCUCHÁ A SYNCRO22 EN SPOTIFY
              </p>
            </div>
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-label inline-flex shrink-0 items-center gap-3 border border-blood bg-blood/10 px-6 py-4 text-bone transition-colors duration-300 hover:bg-blood hover:text-white"
            >
              Escuchar en Spotify →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
