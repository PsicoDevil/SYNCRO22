import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { UpcomingShowCard } from "@/components/shows/UpcomingShowCard";
import { PastShowCard } from "@/components/shows/PastShowCard";
import { historialFirstIds, shows } from "@/content/shows";
import type { Show } from "@/content/types";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shows",
  description: "Próximas fechas e historial de shows de SYNCRO22.",
};

export default function ShowsPage() {
  // Fechas futuras confirmadas: ascendente por fecha ISO (sin año → al final).
  const upcomingShows = shows
    .filter((show) => show.status === "upcoming")
    .slice()
    .sort((a, b) => (a.date ?? "9999-99-99").localeCompare(b.date ?? "9999-99-99"));

  // Historial: los primeros shows según `historialFirstIds` (orden visual);
  // el resto, cronológicamente de más reciente a más antiguo.
  const firstIds = new Set<string>(historialFirstIds);
  const byId = new Map(shows.map((show) => [show.id, show] as const));
  const historialShows = [
    ...historialFirstIds
      .map((id) => byId.get(id))
      .filter((show): show is Show => show !== undefined),
    ...shows.filter((show) => !firstIds.has(show.id)).reverse(),
  ];

  return (
    <>
      <PageHeader
        index="03"
        title="Próximas fechas"
        description="Fechas confirmadas. Toda nueva fecha se anuncia primero en nuestras redes."
      />

      {/* ── Próximas fechas ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-steel/60"
        aria-label="Próximas fechas"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,4,41,0.07),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          {upcomingShows.length > 0 ? (
            <ul className="flex flex-col gap-6">
              {upcomingShows.map((show) => (
                <Reveal as="li" key={show.id}>
                  <UpcomingShowCard show={show} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-6">
              <EmptyState
                title="Nuevas fechas en camino"
                description="No hay fechas confirmadas por ahora. Las próximas presentaciones se anuncian primero en nuestras redes."
              />
              {socialLinks.instagram ? (
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tech-label inline-flex items-center gap-3 border border-steel px-5 py-3 text-fog transition-colors duration-300 hover:border-blood hover:text-blood"
                >
                  Instagram @syncro22_band →
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* ── Historial ────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-black"
        aria-label="Historial de shows"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,4,41,0.06),transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <SectionHeading
            index="3.1"
            title="Historial de shows"
            description="Flyers oficiales de las presentaciones de SYNCRO22."
          />
          {historialShows.length > 0 ? (
            <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {historialShows.map((show, index) => (
                <Reveal
                  as="li"
                  key={show.id}
                  delay={Math.min((index % 3) * 70, 210)}
                  className="h-full"
                >
                  <PastShowCard show={show} index={index + 1} eager={index < 3} />
                </Reveal>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {/* ── Contrataciones ───────────────────────────────────────────── */}
      <section className="border-t border-steel/60 bg-ink" aria-label="Contrataciones">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="display-title max-w-md text-xl text-bone sm:text-2xl">
            ¿Querés a SYNCRO22 en tu escenario?
          </p>
          <Link
            href="/contacto"
            className="tech-label inline-flex items-center gap-3 border border-blood bg-blood/10 px-6 py-4 text-bone transition-colors duration-300 hover:bg-blood hover:text-white"
          >
            Escribinos
          </Link>
        </div>
      </section>
    </>
  );
}