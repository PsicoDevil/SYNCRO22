import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
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

        {/* Índice fantasma decorativo (fuera del flujo, no suma altura en mobile) */}
        <span
          aria-hidden="true"
          className="display-title pointer-events-none absolute -top-4 right-0 select-none text-[7rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,232,232,0.06)] sm:-top-8 sm:text-[12rem] lg:-top-14 lg:text-[16rem]"
        >
          04
        </span>

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