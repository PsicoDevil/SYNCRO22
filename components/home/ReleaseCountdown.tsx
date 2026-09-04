w"use client";

import { useSyncExternalStore } from "react";

interface ReleaseCountdownProps {
  /** Fecha de lanzamiento en formato ISO 8601 con zona horaria. */
  releaseDate: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isReleased: boolean;
}

/**
 * Suscripción al reloj: notifica cada segundo.
 * Fuente externa gestionada con useSyncExternalStore (sin setState en effects).
 */
function subscribe(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000);
  return () => clearInterval(interval);
}

/** Snapshot del cliente: segundos Unix actuales (estable dentro de cada segundo). */
function getSnapshot(): number {
  return Math.floor(Date.now() / 1000);
}

/**
 * Snapshot del servidor: valor determinista (placeholder).
 * Garantiza que el HTML del servidor y el primer render del cliente coincidan
 * → sin hydration mismatch. React re-renderiza con el valor real al hidratar.
 */
function getServerSnapshot(): number {
  return 0;
}

function calculateTimeRemaining(
  targetSeconds: number,
  nowSeconds: number
): TimeRemaining {
  const diff = targetSeconds - nowSeconds;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isReleased: true };
  }

  const totalSeconds = diff;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isReleased: false };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/**
 * Countdown de lanzamiento — elemento sorpresa.
 * No revela qué representa: solo muestra DD DÍAS / HH HRS / MM MIN / SS SEG.
 * Cuando llega la fecha, el contador se detiene en 00.
 */
export function ReleaseCountdown({ releaseDate }: ReleaseCountdownProps) {
  const targetSeconds = Math.floor(new Date(releaseDate).getTime() / 1000);
  const nowSeconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Placeholder determinista durante SSR y el primer render del cliente.
  const isPlaceholder = nowSeconds === 0;
  const time = isPlaceholder
    ? { days: 0, hours: 0, minutes: 0, seconds: 0, isReleased: false }
    : calculateTimeRemaining(targetSeconds, nowSeconds);

  const units = [
    { value: pad(time.days), label: "DÍAS" },
    { value: pad(time.hours), label: "HRS" },
    { value: pad(time.minutes), label: "MIN" },
    { value: pad(time.seconds), label: "SEG" },
  ];

  return (
    <div
      className="flex flex-col items-center"
      role="timer"
      aria-live="off"
      aria-atomic="true"
    >
      <div
        className="flex items-start justify-center gap-2.5 sm:gap-6"
        aria-label={
          time.isReleased
            ? "Disponible"
            : `Faltan ${time.days} días, ${time.hours} horas, ${time.minutes} minutos y ${time.seconds} segundos`
        }
      >
        {units.map((unit, index) => (
          <div key={unit.label} className="flex items-start gap-2.5 sm:gap-6">
            {index > 0 ? (
              <span
                className="mt-1 hidden h-10 w-px bg-steel sm:block"
                aria-hidden="true"
              />
            ) : null}
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
              <span className="font-mono text-2xl font-bold tabular-nums text-bone sm:text-4xl lg:text-5xl">
                {unit.value}
              </span>
              <span className="tech-label text-[0.5625rem] text-blood sm:text-[0.625rem]">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}