import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { releases } from "@/content/releases";

/** Acceso al single: comparte el recurso del catálogo, sin lógica de audio ni fechas. */
export function SingleLaunchLink() {
  const single = releases.find((release) => release.id === "posesion-single");
  if (!single?.cover) return null;

  return (
    <article
      aria-labelledby="home-posesion-title"
      className="mt-8 grid w-full max-w-3xl grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-4 border border-steel bg-ink/80 p-4 text-left sm:mt-12 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:gap-6 sm:p-5 md:mb-4 md:max-w-4xl md:grid-cols-[11.5rem_minmax(0,1fr)_auto] md:p-6 lg:mt-16 lg:mb-6 lg:max-w-5xl lg:grid-cols-[13rem_minmax(0,1fr)_auto] lg:gap-8 lg:p-8"
    >
      <div className="relative aspect-square w-full border border-steel bg-black">
        <Image
          src={single.cover}
          alt={`Portada de ${single.title}`}
          fill
          sizes="(min-width: 1024px) 208px, (min-width: 768px) 184px, (min-width: 640px) 128px, 80px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0">
        <p className="tech-label text-[0.5625rem] leading-relaxed tracking-[0.14em] text-blood md:text-[0.625rem] lg:text-xs">NUEVO LANZAMIENTO</p>
        <h2 id="home-posesion-title" className="display-title mt-2 break-words text-3xl text-bone sm:text-4xl md:mt-3 md:text-5xl lg:text-6xl">{single.title}</h2>
        <p className="mt-2 font-mono text-[0.625rem] leading-relaxed text-fog md:mt-3 md:text-xs">SYNCRO22 · SINGLE</p>
        <p className="tech-label mt-2 text-[0.5625rem] leading-relaxed tracking-[0.14em] text-blood md:mt-3 md:text-[0.625rem]">EXCLUSIVO DE LA WEB</p>
      </div>
      <div className="col-span-2 grid sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:block md:[&>a]:h-12 md:[&>a]:border-blood/60 md:[&>a]:bg-blood/10 lg:[&>a]:h-14 lg:[&>a]:px-8">
        <Button href="/musica" variant="outline">ESCUCHAR SINGLE</Button>
      </div>
    </article>
  );
}
