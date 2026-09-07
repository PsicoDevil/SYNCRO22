"use client";

import Image from "next/image";
import { useRef, useState } from "react";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 5.14v13.72L19 12 8 5.14Z" />
    </svg>
  );
}

interface VideoPressCardProps {
  title: string;
  src: string;
  poster?: string;
}

/**
 * Pieza audiovisual de prensa (Noticias).
 * Reproduce únicamente por interacción del usuario — sin autoplay —
 * con controles nativos una vez iniciada la reproducción.
 */
export function VideoPressCard({ title, src, poster }: VideoPressCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="group relative overflow-hidden border border-steel/70 bg-black/55 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blood/60 hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.85)]">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          controls={isActive}
          disablePictureInPicture
          disableRemotePlayback
          aria-label={`${title} — video`}
          onPlay={() => setIsActive(true)}
          className="h-full w-full object-contain"
        />
        {!isActive && poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
        {!isActive ? (
          <button
            type="button"
            onClick={() => {
              // Reproducción iniciada por el usuario (sin autoplay, con sonido).
              videoRef.current?.play();
            }}
            aria-label={`Reproducir ${title}`}
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/30 transition-colors duration-300 hover:bg-black/15"
          >
            <span className="flex h-14 w-14 items-center justify-center border border-bone/40 bg-black/65 text-bone backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blood group-hover:text-blood sm:h-16 sm:w-16">
              <PlayIcon className="h-6 w-6 translate-x-[2px] sm:h-7 sm:w-7" />
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}