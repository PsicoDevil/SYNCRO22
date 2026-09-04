import Image from "next/image";
import type { Show } from "@/content/types";

/** Tamaños responsive para la grilla de flyers (3 columnas en desktop). */
const FLYER_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, calc(100vw - 3rem)";

interface PastShowCardProps {
  show: Show;
  /** Posición dentro del historial (1-based), para el numeral editorial. */
  index?: number;
  /** Carga prioritaria para las primeras tarjetas visibles del grid. */
  eager?: boolean;
}

/**
 * Tarjeta del historial: flyer completo (object-contain, sin recortes ni
 * deformaciones), fecha con jerarquía fuerte y solo los datos que figuran
 * en el flyer.
 */
export function PastShowCard({ show, index, eager = false }: PastShowCardProps) {
  return (
    <article className="group flex h-full flex-col border border-steel bg-ink transition-colors duration-300 hover:border-blood/80">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
        {show.flyer ? (
          <Image
            src={show.flyer}
            alt={`Flyer de ${show.title} — ${show.dateLabel}`}
            fill
            sizes={FLYER_SIZES}
            loading={eager ? "eager" : "lazy"}
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <span className="tech-label text-smoke">Flyer no disponible</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 border-t border-steel/60 p-5">
        {index !== undefined ? (
          <span className="tech-label text-blood">{String(index).padStart(2, "0")}</span>
        ) : null}
        <div className="flex items-baseline justify-between gap-3">
          <p className="display-title text-xl text-bone sm:text-2xl">{show.dateLabel}</p>
          {show.time ? (
            <span className="tech-label shrink-0 text-blood">{show.time}</span>
          ) : null}
        </div>
        <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-bone/80">
          {show.title}
        </h3>
        {show.venue ? <p className="text-sm text-fog">{show.venue}</p> : null}
        {show.address ? <p className="text-sm text-smoke">{show.address}</p> : null}
        {show.city ? <p className="text-sm text-smoke">{show.city}</p> : null}
        {show.notes ? (
          <p className="tech-label mt-auto pt-2 text-[0.625rem] text-smoke">{show.notes}</p>
        ) : null}
      </div>
    </article>
  );
}