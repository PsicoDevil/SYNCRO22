"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, CloseIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { GalleryImage } from "@/content/types";

/** Tamaños para la optimización responsive de las miniaturas. */
const GRID_SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw";

/** Tamaños para la imagen ampliada del lightbox. */
const LIGHTBOX_SIZES = "(min-width: 1024px) 80vw, 92vw";

interface GalleryGridProps {
  images: GalleryImage[];
}

/**
 * Grilla tipo masonry + lightbox propio (sin dependencias).
 * Cada imagen conserva su proporción real (sin recortes ni deformaciones).
 */
export function GalleryGrid({ images }: GalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const navigate = useCallback(
    (delta: number) =>
      setActiveIndex((prev) =>
        prev === null ? null : (prev + delta + images.length) % images.length
      ),
    [images.length]
  );

  return (
    <>
      <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {images.map((image, index) => (
          <Reveal
            as="li"
            key={image.id}
            delay={Math.min(index * 40, 360)}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block w-full cursor-pointer overflow-hidden border border-steel transition-colors duration-300 hover:border-blood"
              aria-label={`Ampliar imagen ${index + 1} de la galería`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={GRID_SIZES}
                loading={index < 4 ? "eager" : "lazy"}
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span
                className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              >
                <span className="tech-label m-3 text-bone">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {activeIndex !== null ? (
        <GalleryLightbox
          images={images}
          index={activeIndex}
          onClose={close}
          onNavigate={navigate}
        />
      ) : null}
    </>
  );
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (delta: number) => void;
}

/**
 * Lightbox minimalista: Esc o el botón X cierran, las flechas del teclado
 * y los botones navegan. Bloquea el scroll del fondo mientras está abierto.
 */
function GalleryLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[index];

  // Teclado: Escape cierra, flechas navegan (navegación circular).
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(1);
      if (event.key === "ArrowLeft") onNavigate(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNavigate]);

  // Bloquea el scroll del fondo mientras el lightbox está abierto.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Foco inicial en el botón de cierre (accesibilidad).
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ${index + 1} de ${images.length} de la galería`}
    >
      {/* Barra superior: contador + cierre */}
      <div className="flex shrink-0 items-center justify-between border-b border-steel/60 px-4 py-3 sm:px-6">
        <span className="tech-label text-smoke">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center border border-steel text-bone transition-colors duration-300 hover:border-blood hover:text-blood"
          aria-label="Cerrar imagen ampliada"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Imagen ampliada — fill + object-contain: nunca se deforma */}
      <div className="relative flex-1">
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          fill
          sizes={LIGHTBOX_SIZES}
          priority
          className="object-contain p-4 sm:p-8"
        />
      </div>

      {/* Navegación */}
      <div className="flex shrink-0 items-center justify-center gap-3 border-t border-steel/60 px-4 py-4 sm:gap-4 sm:py-5">
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          className="inline-flex h-11 w-11 items-center justify-center border border-steel text-bone transition-colors duration-300 hover:border-blood hover:text-blood"
          aria-label="Imagen anterior"
        >
          <ArrowRightIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          className="inline-flex h-11 w-11 items-center justify-center border border-steel text-bone transition-colors duration-300 hover:border-blood hover:text-blood"
          aria-label="Imagen siguiente"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}