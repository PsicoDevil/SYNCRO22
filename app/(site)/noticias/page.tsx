import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Noticias y novedades de SYNCRO22.",
};

export default function NoticiasPage() {
  return (
    <>
      <PageHeader
        index="05"
        title="Noticias"
        description="Novedades y anuncios de SYNCRO22."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {news.length === 0 ? (
          <EmptyState
            title="Noticias en preparación"
            description="Las novedades de SYNCRO22 se publicarán aquí cuando existan."
          />
        ) : (
          <p>Noticias próximamente.</p>
        )}
      </section>
    </>
  );
}