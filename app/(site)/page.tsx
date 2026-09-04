import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ReleaseCountdown } from "@/components/home/ReleaseCountdown";
import { Biography } from "@/components/home/Biography";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden bg-black">
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
            className="aspect-square h-[clamp(7rem,22vh,12rem)] w-auto max-w-full object-contain mix-blend-screen sm:h-[clamp(10rem,28vh,20rem)]"
          />
          {site.releaseDate ? (
            <div className="mt-8 sm:mt-12">
              <ReleaseCountdown releaseDate={site.releaseDate} />
            </div>
          ) : null}
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4">
            <Button href="/musica" size="lg">
              ESCUCHAR
            </Button>
            <Button href="/shows" variant="outline" size="lg">
              SHOWS
            </Button>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          "DE MÍ NUNCA VAS A ESCAPAR, ME ALIMENTO DE SANGRE Y OSCURIDAD...",
        ]}
      />

      {/* BIOGRAFÍA */}
      <Biography paragraphs={site.biography ?? []} />
    </>
  );
}