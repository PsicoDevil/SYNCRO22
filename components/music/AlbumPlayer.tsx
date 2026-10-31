"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import styles from "./AudioPlayer.module.css";

interface AlbumTrack {
  id: string;
  title: string;
  audioUrl: string;
}

interface AlbumPlayerProps {
  tracks: AlbumTrack[];
  lyrics: ReactNode[];
}

function formatTime(seconds: number) {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/** Un único audio para toda la lista. Los desplegables de letras se renderizan en el servidor. */
export function AlbumPlayer({ tracks, lyrics }: AlbumPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const controlId = useId();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsPlay, setNeedsPlay] = useState(false);
  const track = tracks[index];
  const hasDuration = Number.isFinite(duration) && duration > 0;

  function failPlayback() {
    setPlaying(false);
    setLoading(false);
    setError("No se pudo reproducir esta canción. Reintentá o elegí otra pista.");
  }

  async function play() {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setError(null);
    setNeedsPlay(false);
    setLoading(true);
    try {
      await audio.play();
    } catch (cause) {
      if (request !== playRequest.current) return;
      if (cause instanceof Error && cause.name === "AbortError") return;
      if (cause instanceof Error && cause.name === "NotAllowedError") {
        setPlaying(false);
        setLoading(false);
        setNeedsPlay(true);
      } else {
        failPlayback();
      }
    }
  }

  function selectTrack(nextIndex: number) {
    const audio = audioRef.current;
    if (!audio || nextIndex < 0 || nextIndex >= tracks.length) return;
    if (nextIndex !== index) {
      ++playRequest.current;
      audio.pause();
      audio.src = tracks[nextIndex].audioUrl;
      audio.load();
      setIndex(nextIndex);
      setCurrentTime(0);
      setDuration(0);
      setPlaying(false);
    }
    void play();
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      ++playRequest.current;
      audio.pause();
    } else {
      if (error) audio.load();
      void play();
    }
  }

  if (!track) return null;

  const buttonClass = "inline-flex min-h-11 min-w-11 items-center justify-center border border-steel px-4 text-sm text-bone transition-colors hover:border-blood hover:text-blood disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="min-w-0">
      <div role="group" aria-label="Reproductor de 9 Peldaños" className="mb-8 min-w-0 border border-steel bg-ink/80 p-4 sm:p-6">
        <audio
          ref={audioRef}
          src={tracks[0].audioUrl}
          preload="metadata"
          aria-label="Audio del álbum 9 Peldaños"
          onLoadStart={() => setLoading(true)}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
            setLoading(false);
          }}
          onDurationChange={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={(event) => {
            document.querySelectorAll("audio").forEach((other) => {
              if (other !== event.currentTarget) other.pause();
            });
            setPlaying(true);
            setError(null);
            setNeedsPlay(false);
          }}
          onPlaying={() => setLoading(false)}
          onPause={() => { setPlaying(false); setLoading(false); }}
          onWaiting={() => setLoading(true)}
          onCanPlay={() => setLoading(false)}
          onEnded={() => {
            setPlaying(false);
            setLoading(false);
            if (index < tracks.length - 1) selectTrack(index + 1);
          }}
          onVolumeChange={(event) => {
            setVolume(event.currentTarget.volume);
            setMuted(event.currentTarget.muted);
          }}
          onError={failPlayback}
        />
        <p className="tech-label text-blood">9 Peldaños · Audio oficial</p>
        <p className="mt-3 break-words text-xl font-semibold text-bone sm:text-2xl">{String(index + 1).padStart(2, "0")} · {track.title}</p>
        <p role="status" className="mt-2 min-h-5 text-xs text-fog">
          {error ?? (needsPlay ? "Presioná Reproducir para escuchar la canción." : loading ? "Cargando audio…" : playing ? "Reproduciendo" : "En pausa")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className={buttonClass} disabled={index === 0} onClick={() => selectTrack(index - 1)} aria-label="Canción anterior">Anterior</button>
          <button type="button" className={`${buttonClass} border-blood bg-blood/15`} onClick={togglePlayback} aria-label={`${error ? "Reintentar" : playing ? "Pausar" : "Reproducir"} ${track.title}`}>
            {error ? "Reintentar" : playing ? "Pausar" : "Reproducir"}
          </button>
          <button type="button" className={buttonClass} disabled={index === tracks.length - 1} onClick={() => selectTrack(index + 1)} aria-label="Canción siguiente">Siguiente</button>
        </div>
        <label htmlFor={`${controlId}-progress`} className="sr-only">Posición de reproducción</label>
        <input
          id={`${controlId}-progress`} type="range" min={0} max={hasDuration ? duration : 1} step={0.1}
          value={hasDuration ? Math.min(currentTime, duration) : 0} disabled={!hasDuration || Boolean(error)}
          aria-valuetext={`${formatTime(currentTime)} de ${formatTime(duration)}`} className={styles.slider}
          onChange={(event) => {
            if (!audioRef.current || !hasDuration) return;
            audioRef.current.currentTime = event.currentTarget.valueAsNumber;
            setCurrentTime(audioRef.current.currentTime);
          }}
        />
        <div className="flex justify-between font-mono text-xs text-fog"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-steel pt-4">
          <button type="button" className={buttonClass} aria-label={muted ? "Activar sonido" : "Silenciar"} aria-pressed={muted} onClick={() => {
            if (audioRef.current) audioRef.current.muted = !audioRef.current.muted;
          }}>{muted ? "Activar sonido" : "Silenciar"}</button>
          <label htmlFor={`${controlId}-volume`} className="text-xs text-fog">Volumen</label>
          <div className="w-28 sm:w-40"><input id={`${controlId}-volume`} type="range" min={0} max={1} step={0.01} value={volume} className={styles.slider} aria-valuetext={`${Math.round(volume * 100)}%`} onChange={(event) => {
            if (!audioRef.current) return;
            audioRef.current.volume = event.currentTarget.valueAsNumber;
            audioRef.current.muted = false;
          }} /></div>
          <span className="font-mono text-xs text-fog">{muted ? 0 : Math.round(volume * 100)}%</span>
        </div>
      </div>
      <ol aria-label="Canciones de 9 Peldaños" className="min-w-0 border-t border-steel">
        {tracks.map((item, itemIndex) => (
          <li key={item.id} className={`grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-1 sm:gap-3 ${itemIndex === index ? "bg-blood/5" : ""}`}>
            <button type="button" className="mt-5 flex min-h-11 min-w-11 items-center justify-center border border-steel text-blood hover:border-blood" aria-label={`${itemIndex === index && playing ? "Pausar" : "Reproducir"} ${item.title}`} aria-current={itemIndex === index ? "true" : undefined} onClick={() => itemIndex === index ? togglePlayback() : selectTrack(itemIndex)}>
              <span aria-hidden="true">{itemIndex === index && playing ? "❚❚" : "▶"}</span>
            </button>
            {lyrics[itemIndex]}
          </li>
        ))}
      </ol>
    </div>
  );
}
