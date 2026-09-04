import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

interface BiographyProps {
  /** Párrafos de la biografía oficial (contenido centralizado en content/site.ts). */
  paragraphs: string[];
}

/**
 * Sección editorial "BIOGRAFÍA" del Home.
 * Solo presenta el texto provisto por la banda — no agrega ni reescribe contenido.
 */
export function Biography({ paragraphs }: BiographyProps) {
  if (paragraphs.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden bg-black py-16 sm:py-24 lg:py-32"
      aria-label="Biografía de SYNCRO22"
    >
      {/* Luz ambiental — espejo del Hero en la esquina opuesta */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,4,41,0.10),transparent_55%)]"
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
        01
      </span>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        {/* Columna editorial: título + metadatos */}
        <div className="flex flex-col lg:col-span-4">
          <Reveal>
            <SectionHeading index="01" title="BIOGRAFÍA" />
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 lg:mt-12">
              <span className="tech-label text-smoke">ROCK ALTERNATIVO</span>
              <span className="tech-label text-smoke">EST. 2022</span>
            </div>
          </Reveal>
        </div>

        {/* Texto de la biografía */}
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={120}>
            <div className="flex flex-col gap-6 sm:gap-8">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    "leading-relaxed",
                    index === 0
                      ? "text-base text-bone first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-blood sm:text-lg sm:first-letter:text-6xl lg:text-xl"
                      : "text-base text-fog sm:text-lg"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 h-px w-24 bg-blood/60 sm:mt-14" aria-hidden="true" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}