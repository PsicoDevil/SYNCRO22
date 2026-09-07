import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { VideoPressCard } from "@/components/videos/VideoPressCard";
import { news } from "@/content/news";

// Prensa audiovisual — entrevista (recurso existente). El archivo original
// "Entrevista - ESQUIÚ ROCK.mkv" vive en /public/news (sin mover ni renombrar);
// se sirve desde la copia remuxada (h264/AAC) compatible con <video>.
const PRESS_INTERVIEW = {
  title: "Entrevista - ESQUIÚ ROCK",
  src: "/video/entrevista-esquiu-rock.mp4",
  poster: "/video/posters/entrevista-esquiu-rock.jpg",
};

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

      {/* Composición editorial — giannoticias: luz fría a la izquierda, cálida a la derecha */}
      <figure className="relative h-[52vh] min-h-[340px] w-full overflow-hidden bg-black sm:h-[60vh] lg:h-[70vh]">
        <Image
          src="/news/giannoticias.png"
          alt="Los músicos de SYNCRO22 entre humo, bajo luz fría y cálida de escenario"
          fill
          sizes="100vw"
          preload
          className="object-cover object-[50%_28%] opacity-65 brightness-65 saturate-55"
        />
        {/* Gradientes cinematográficos: fundido a negro y viñeta lateral */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,#050505_3%,rgba(5,5,5,0.7)_35%,transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,5,0.7)_0%,transparent_30%,transparent_70%,rgba(5,5,5,0.7)_100%)]"
          aria-hidden="true"
        />
        <figcaption className="absolute bottom-6 left-6 z-10 sm:bottom-10 sm:left-10 lg:bottom-12 lg:left-16">
          <span className="tech-label text-blood">SYNCRO22</span>
          <span className="mt-2 block font-mono text-xs text-fog sm:text-sm">
            EN ESCENA
          </span>
        </figcaption>
      </figure>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        {news.length === 0 ? (
          <EmptyState
            title="Noticias en preparación"
            description="Las novedades de SYNCRO22 se publicarán aquí cuando existan."
          />
        ) : (
          <div className="flex flex-col gap-16">
            {news.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12"
              >
                <figure className="relative m-0 aspect-[1280/905] w-full overflow-hidden border border-steel bg-black lg:col-span-3">
                  <Image
                    src={item.image ?? ""}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-contain"
                  />
                </figure>
                <div className="lg:col-span-2">
                  <span className="tech-label text-blood">
                    EXPOFERIA INCLUSIVA DEL CHAVARRÍA
                  </span>
                  <h2 className="display-title mt-4 text-3xl text-bone sm:text-4xl">
                    {item.title}
                  </h2>
                  {item.excerpt ? (
                    <blockquote className="mt-6 border-l-2 border-blood pl-4 text-sm leading-relaxed text-fog sm:text-base">
                      &ldquo;{item.excerpt}&rdquo;
                    </blockquote>
                  ) : null}
                  {item.date ? (
                    <p className="mt-6 font-mono text-xs text-smoke">{item.date}</p>
                  ) : null}
                </div>
              </article>
            ))}

            {/* Prensa audiovisual — entrevista (reproduce por interacción, sin autoplay) */}
            <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-3">
                <VideoPressCard
                  title={PRESS_INTERVIEW.title}
                  src={PRESS_INTERVIEW.src}
                  poster={PRESS_INTERVIEW.poster}
                />
              </div>
              <div className="lg:col-span-2">
                <span className="tech-label text-blood">PRENSA · VIDEO</span>
                <h2 className="display-title mt-4 text-3xl text-bone sm:text-4xl">
                  {PRESS_INTERVIEW.title}
                </h2>
              </div>
            </article>
          </div>
        )}
      </section>
    </>
  );
}