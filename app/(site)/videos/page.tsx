import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { VideosShowcase } from "@/components/videos/VideosShowcase";
import { videos } from "@/content/videos";

export const metadata: Metadata = {
  title: "Videos",
  description: "Videos oficiales, lyric videos y presentaciones en vivo de SYNCRO22.",
};

export default function VideosPage() {
  return (
    <>
      <PageHeader
        index="02"
        title="Videos"
        description="Videos oficiales, lyric videos y presentaciones en vivo de SYNCRO22."
      />

      <section className="relative isolate overflow-hidden bg-ink">
        {/* Ambientación — elivideo: luz fría y fuego en escena (fondo, no protagonista) */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/videos/elivideo.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[60%_25%] opacity-45 brightness-85 saturate-50"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,5,0.6)_0%,rgba(5,5,5,0.3)_30%,rgba(5,5,5,0.4)_70%,rgba(5,5,5,0.8)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,5,0.55)_0%,transparent_25%,transparent_75%,rgba(5,5,5,0.55)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-10 flex items-center gap-4 sm:mb-14">
            <span className="tech-label text-blood">AUDIOVISUAL</span>
            <span className="industrial-line flex-1" aria-hidden="true" />
          </div>

          <VideosShowcase videos={videos} />
        </div>
      </section>
    </>
  );
}