import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { Biography } from "@/components/home/Biography";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-black">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="/album/9-peldanos-fondo-poster.jpg"
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/album/9-peldanos-fondo-compatible.mp4" type="video/mp4" media="(min-width: 768px) and (prefers-reduced-motion: no-preference)" />
          </video>
          <div className="absolute right-0 bottom-0 h-32 w-64 bg-[radial-gradient(ellipse_100%_100%_at_100%_100%,#000_0%,#000_45%,rgba(0,0,0,0.98)_60%,rgba(0,0,0,0.65)_78%,transparent_100%)] sm:h-48 sm:w-96 lg:h-56 lg:w-[30rem]" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,4,41,0.12),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="tech-label mb-4 text-blood sm:mb-8">SITIO OFICIAL</p>
          <video
            src="/syncro22_smoke_embers_1080.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            className="aspect-square h-[clamp(8.4rem,26.4vh,14.4rem)] w-auto max-w-full object-contain mix-blend-screen sm:h-[clamp(12rem,33.6vh,24rem)] lg:h-[clamp(18rem,47vh,27rem)]"
          />
          <div className="mt-8 sm:mt-10">
            <p className="tech-label text-blood">NUEVO ÁLBUM</p>
            <h1 className="display-title mt-3 text-6xl text-bone sm:text-7xl lg:text-8xl">9 PELDAÑOS</h1>
            <p className="tech-label mt-4 text-blood">YA DISPONIBLE</p>
          </div>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/musica/9-peldanos" size="lg">
              ESCUCHAR EL DISCO
            </Button>
            <Button href="/shows" variant="outline" size="lg">
              SHOWS
            </Button>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "DE MI VOS NUNCA VAS A ESCAPAR, ME ALIMENTO DE SANGRE Y OSCURIDAD...",
        ]}
      />

      {/* BIOGRAFÍA */}
      <Biography paragraphs={site.biography ?? []} />
    </>
  );
}
