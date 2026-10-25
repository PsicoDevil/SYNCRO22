import Link from "next/link";
import { ReleaseCountdown } from "@/components/home/ReleaseCountdown";

export function AlbumTeaser({ releaseDate }: { releaseDate: string }) {
  return (
    <div className="flex flex-col items-start gap-8 border border-steel bg-ink/60 p-6 sm:p-10">
      <div>
        <p className="tech-label text-blood">Próximo álbum</p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-fog">Un nuevo capítulo está por llegar. El álbum se revelará cuando termine el countdown.</p>
      </div>
      <ReleaseCountdown releaseDate={releaseDate} />
      <Link href="/musica/9-peldanos" className="tech-label inline-flex min-h-11 items-center border-b border-blood py-3 text-bone transition-colors hover:text-blood">
        Ver próximo álbum →
      </Link>
    </div>
  );
}
