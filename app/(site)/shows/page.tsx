import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { shows } from "@/content/shows";

export const metadata: Metadata = {
  title: "Shows",
  description: "Próximas fechas y shows de SYNCRO22.",
};

export default function ShowsPage() {
  const upcomingShows = shows.filter((show) => show.status === "upcoming");

  return (
    <>
      <PageHeader
        index="03"
        title="Shows"
        description="Próximas fechas y presentaciones de SYNCRO22."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {upcomingShows.length === 0 ? (
          <EmptyState
            title="Próximas fechas"
            description="Las fechas de shows de SYNCRO22 se publicarán aquí cuando estén confirmadas."
          />
        ) : (
          <p>Shows próximamente.</p>
        )}
      </section>
    </>
  );
}