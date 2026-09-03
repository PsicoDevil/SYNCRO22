import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { galleryImages } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotografías de SYNCRO22.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        index="04"
        title="Galería"
        description="Fotografías de SYNCRO22 en vivo y de estudio."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {galleryImages.length === 0 ? (
          <EmptyState
            title="Galería en preparación"
            description="Las fotografías de SYNCRO22 se publicarán aquí cuando estén disponibles."
          />
        ) : (
          <p>Galería próximamente.</p>
        )}
      </section>
    </>
  );
}