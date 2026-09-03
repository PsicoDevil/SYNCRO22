import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { releases } from "@/content/releases";

export const metadata: Metadata = {
  title: "Música",
  description: "Discografía de SYNCRO22.",
};

export default function MusicaPage() {
  return (
    <>
      <PageHeader
        index="01"
        title="Música"
        description="Discografía, singles y lanzamientos de SYNCRO22."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {releases.length === 0 ? (
          <EmptyState
            title="Discografía en preparación"
            description="Los lanzamientos de SYNCRO22 se publicarán aquí cuando estén disponibles."
          />
        ) : (
          <p>Discografía próximamente.</p>
        )}
      </section>
    </>
  );
}