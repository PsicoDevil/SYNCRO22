import Image from "next/image";
import type { Show } from "@/content/types";

interface UpcomingShowCardProps {
  show: Show;
}

/**
 * Fila destacada para una fecha futura confirmada.
 * Formato horizontal (flyer a la izquierda, datos a la derecha).
 */
export function UpcomingShowCard({ show }: UpcomingShowCardProps) {
  return (
    <article className="flex flex-col gap-6 border border-steel bg-ink p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
      {show.flyer ? (
        <div className="relative aspect-[3/4] w-40 shrink-0 self-start overflow-hidden bg-black sm:w-44">
          <Image
            src={show.flyer}
            alt={`Flyer de ${show.title} — ${show.dateLabel}`}
            fill
            sizes="176px"
            className="object-contain p-2"
          />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="tech-label text-blood">Próxima fecha</span>
        <p className="display-title text-3xl text-bone sm:text-4xl">{show.dateLabel}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {show.time ? <span className="tech-label text-fog">{show.time}</span> : null}
          <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-bone/80">
            {show.title}
          </h3>
        </div>
        {show.venue ? <p className="text-sm text-fog">{show.venue}</p> : null}
        {show.address ? <p className="text-sm text-smoke">{show.address}</p> : null}
        {show.notes ? (
          <p className="tech-label pt-2 text-[0.625rem] text-smoke">{show.notes}</p>
        ) : null}
      </div>
    </article>
  );
}