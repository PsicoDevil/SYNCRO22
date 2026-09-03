import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ReleaseCountdown } from "@/components/home/ReleaseCountdown";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,4,41,0.12),transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.04),transparent_50%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-8">
          <p className="tech-label mb-8 text-blood">SITIO OFICIAL</p>
          <Image
            src="/syncrologo-cropped.svg"
            alt="SYNCRO22"
            width={940}
            height={1672}
            priority
            className="h-[clamp(10rem,28vh,20rem)] w-auto"
          />
          {site.releaseDate ? (
            <div className="mt-12">
              <ReleaseCountdown releaseDate={site.releaseDate} />
            </div>
          ) : null}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
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
    </>
  );
}