import Image from "next/image";
import { cn } from "@/lib/utils";

interface MemberPortraitProps {
  name: string;
  /** Ruta de la foto dentro de /public (ej. /integrantes/eligo.png). */
  photo?: string;
  /** Posición del integrante en el roster (1-based). */
  index?: number;
  /** Total de integrantes del roster. */
  total?: number;
  className?: string;
}

/**
 * Retrato editorial de un integrante (página /integrantes).
 * Marco 4:5 con recorte centrado — la proporción original de cada foto
 * se preserva en /public; el recorte es solo de presentación.
 * Tratamiento monocromático que recupera color al hover.
 */
export function MemberPortrait({
  name,
  photo,
  index = 1,
  total = 1,
  className,
}: MemberPortraitProps) {
  return (
    <figure
      className={cn(
        "group relative m-0 overflow-hidden border border-steel bg-ink transition-colors duration-300 hover:border-blood/60",
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {photo ? (
          <Image
            src={photo}
            alt={`Retrato de ${name}, integrante de SYNCRO22`}
            fill
            preload
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw"
            className="object-cover object-center grayscale-[0.35] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="tech-label text-smoke">FOTO PENDIENTE</span>
          </div>
        )}
      </div>
      <figcaption className="absolute bottom-4 left-4 z-10 border border-steel/70 bg-black/70 px-3 py-2 backdrop-blur-sm">
        <span className="tech-label text-bone">
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </figcaption>
    </figure>
  );
}