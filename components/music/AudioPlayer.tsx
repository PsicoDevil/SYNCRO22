"use client";

import { useId, useRef, useState } from "react";
import styles from "./AudioPlayer.module.css";

interface AudioPlayerProps {
  src: string;
  title: string;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const wholeSeconds = Math.floor(seconds);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, "0")}`;
}

/** El cambio de archivo reinicia el estado y el elemento de audio. */
export function AudioPlayer(props: AudioPlayerProps) {
  return <AudioPlayerControls key={props.src} {...props} />;
}

function AudioPlayerControls({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const controlId = useId();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const hasDuration = Number.isFinite(duration) && duration > 0;

  function failPlayback() {
    setError("No se pudo reproducir el audio. Volvé a intentar.");
    setIsPlaying(false);
    setIsLoading(false);
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      if (error) {
        setError(null);
        audio.load();
      }
      setIsLoading(true);
      await audio.play();
    } catch (cause) {
      // Pausar mientras play() espera datos cancela esa promesa normalmente.
      if (cause instanceof Error && cause.name === "AbortError") return;
      failPlayback();
    }
  }

  return (
    <div role="group" aria-label={`Reproductor de ${title}`} className="mt-7 w-full min-w-0 border border-steel bg-black/80 p-4 sm:p-5">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        aria-label={title}
        onLoadStart={() => setIsLoading(true)}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setIsLoading(false);
        }}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={(event) => {
          document.querySelectorAll("audio").forEach((other) => {
            if (other !== event.currentTarget) other.pause();
          });
          setIsPlaying(true);
          setError(null);
        }}
        onPlaying={() => setIsLoading(false)}
        onPause={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onEnded={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onVolumeChange={(event) => setVolume(event.currentTarget.muted ? 0 : event.currentTarget.volume)}
        onError={failPlayback}
      />
      <div className="flex items-center justify-between gap-3">
        <span className="tech-label text-blood">Audio oficial</span>
        <span role="status" className="text-right text-xs text-fog">
          {error ? "Audio no disponible" : isLoading ? "Cargando audio…" : isPlaying ? "Reproduciendo" : "En pausa"}
        </span>
      </div>
      <div className="mt-4 flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={`${error ? "Reintentar reproducción de" : isPlaying ? "Pausar" : "Reproducir"} ${title}`}
          className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center border border-blood bg-blood/15 text-bone transition-colors hover:bg-blood"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            {isPlaying ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="m7 3 15 9-15 9z" />}
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <label htmlFor={`${controlId}-progress`} className="sr-only">Posición de reproducción de {title}</label>
          <input
            id={`${controlId}-progress`}
            type="range"
            min={0}
            max={hasDuration ? duration : 1}
            step={0.1}
            value={hasDuration ? Math.min(currentTime, duration) : 0}
            disabled={!hasDuration || Boolean(error)}
            aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`}
            className={styles.slider}
            onChange={(event) => {
              const audio = audioRef.current;
              if (!audio || !hasDuration) return;
              audio.currentTime = event.currentTarget.valueAsNumber;
              setCurrentTime(audio.currentTime);
            }}
          />
          <div className="flex justify-between gap-3 font-mono text-xs tabular-nums text-fog" aria-hidden="true">
            <span>{formatTime(currentTime)}</span>
            <span>{hasDuration ? formatTime(duration) : "–:––"}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-steel/60 pt-2">
        <label htmlFor={`${controlId}-volume`} className="text-xs text-fog">Volumen</label>
        <input
          id={`${controlId}-volume`}
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          aria-valuetext={`${Math.round(volume * 100)}%`}
          className={`${styles.slider} max-w-36`}
          onChange={(event) => {
            const audio = audioRef.current;
            if (!audio) return;
            audio.muted = false;
            audio.volume = event.currentTarget.valueAsNumber;
            setVolume(audio.volume);
          }}
        />
        <span className="w-9 shrink-0 text-right font-mono text-xs text-fog" aria-hidden="true">{Math.round(volume * 100)}%</span>
      </div>
      {error ? <p role="alert" className="mt-3 text-sm leading-relaxed text-bone">{error}</p> : null}
    </div>
  );
}
