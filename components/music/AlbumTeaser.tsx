import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { debutAlbum } from "@/content/releases";

export function AlbumTeaser() {
  return (
    <article className="flex min-w-0 flex-col gap-8 border border-steel bg-ink/60 p-6 sm:flex-row sm:items-center sm:p-10">
      {debutAlbum.cover ? <Image src={debutAlbum.cover} alt={`Portada de ${debutAlbum.title}`} width={256} height={256} sizes="(min-width: 640px) 224px, 256px" className="aspect-square w-full max-w-64 shrink-0 self-center border border-steel object-cover sm:w-56" /> : null}
      <div className="min-w-0">
        <p className="tech-label text-blood">ÁLBUM DISPONIBLE</p>
        <h3 className="display-title mt-4 break-words text-4xl text-bone sm:text-6xl">{debutAlbum.title}</h3>
        <p className="mt-4 font-mono text-xs leading-relaxed tracking-[0.12em] text-fog">{debutAlbum.artist} · ÁLBUM COMPLETO</p>
        <div className="mt-6">
          <Button href={`/musica/${debutAlbum.slug}`}>ESCUCHAR EL DISCO</Button>
        </div>
      </div>
    </article>
  );
}
