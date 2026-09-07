"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Video } from "@/content/types";
import { cn } from "@/lib/utils";

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

interface VideoSlotProps {
  video: Video;
  variant: "featured" | "compact";
  isActive: boolean;
  onActivate: (video: Video) => void;
  register: (id: string, element: HTMLIFrameElement | null) => void;
}

function VideoSlot({ video, variant, isActive, onActivate, register }: VideoSlotProps) {
  const isFeatured = variant === "featured";

  return (
    <figure
      className={cn(
        // Pieza audiovisual flotante: vidrio oscuro, borde sutil, sombra suave.
        "group relative m-0 flex flex-col overflow-hidden border border-steel/70 bg-black/55 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.75)] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blood/60 hover:shadow-[0_30px_60px_-18px_rgba(0,0,0,0.85)]",
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {/*
          Embed de YouTube: se monta ÚNICAMENTE al hacer click en el botón Play
          (patrón fachada) — nada se carga ni reproduce al cargar la página.
          El parámetro autoplay entra en acción recién entonces: la reproducción
          siempre la inicia el usuario. Sin archivos de video locales.
        */}
        {isActive ? (
          <iframe
            ref={(element) => {
              register(video.id, element);
            }}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&playsinline=1&rel=0`}
            title={`${video.title} — ${video.category ?? "video"}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : null}
        {!isActive && video.poster ? (
          <Image
            src={video.poster}
            alt=""
            fill
            sizes={
              isFeatured
                ? "(min-width: 1280px) 48rem, (min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1280px) 22rem, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
            }
            className="pointer-events-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : null}
        {!isActive ? (
          <button
            type="button"
            onClick={() => onActivate(video)}
            aria-label={`Reproducir ${video.title}`}
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/30 transition-colors duration-300 hover:bg-black/15"
          >
            <span
              className={cn(
                "flex items-center justify-center border border-bone/40 bg-black/65 text-bone backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blood group-hover:text-blood",
                isFeatured ? "h-14 w-14 sm:h-16 sm:w-16" : "h-11 w-11 sm:h-12 sm:w-12",
              )}
            >
              <PlayIcon
                className={cn(
                  "translate-x-[2px]",
                  isFeatured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5",
                )}
              />
            </span>
          </button>
        ) : null}
      </div>
      <figcaption className="flex flex-col gap-1.5 border-t border-steel/50 px-4 py-3.5 sm:px-5 sm:py-4">
        <span className="tech-label text-blood">{video.category}</span>
        <h3
          className={cn(
            "display-title text-bone",
            isFeatured ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
          )}
        >
          {video.title}
        </h3>
      </figcaption>
    </figure>
  );
}

interface VideosShowcaseProps {
  videos: Video[];
}

export function VideosShowcase({ videos }: VideosShowcaseProps) {
  const featured = videos.find((video) => video.featured) ?? videos[0];
  const secondary = videos.filter((video) => video.id !== featured.id);

  const [activeId, setActiveId] = useState<string | null>(null);
  const registry = useRef(new Map<string, HTMLIFrameElement>());

  const register = (id: string, element: HTMLIFrameElement | null) => {
    if (element) {
      registry.current.set(id, element);
    } else {
      registry.current.delete(id);
    }
  };

  // Solo un video en reproducción a la vez: al activar uno se pausan los
  // demás embeds (YouTube IFrame API vía postMessage).
  const handleActivate = (video: Video) => {
    registry.current.forEach((iframe, id) => {
      if (id !== video.id) {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*",
        );
      }
    });
    setActiveId(video.id);
  };

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      {/* Destacado — card mayor sin ocupar todo el ancho: el fondo respira alrededor. */}
      <div className="w-full max-w-3xl">
        <VideoSlot
          video={featured}
          variant="featured"
          isActive={activeId === featured.id}
          onActivate={handleActivate}
          register={register}
        />
      </div>
      {/* Secundarios — grilla compacta con aire entre piezas para ver el fondo. */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {secondary.map((video) => (
          <VideoSlot
            key={video.id}
            video={video}
            variant="compact"
            isActive={activeId === video.id}
            onActivate={handleActivate}
            register={register}
          />
        ))}
      </div>
    </div>
  );
}