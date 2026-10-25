import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryImages } from "@/content/gallery";
import { siteNavigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotografías de SYNCRO22.",
};

export default function GaleriaPage() {
  return (
    <>
      <PageHeader
        index={siteNavigation.galeria.index}
        title="Galería"
        description="Fotografías de SYNCRO22 en vivo y de estudio."
      />

      <section
        className="relative overflow-hidden bg-black py-16 sm:py-24"
        aria-label="Galería de fotos de SYNCRO22"
      >
        {/* Luz ambiental — misma gramática visual que el resto del sitio */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,4,41,0.08),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.03),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
          {galleryImages.length === 0 ? (
            <EmptyState
              title="Galería en preparación"
              description="Las fotografías de SYNCRO22 se publicarán aquí cuando estén disponibles."
            />
          ) : (
            <GalleryGrid images={galleryImages} />
          )}
        </div>
      </section>
    </>
  );
}
