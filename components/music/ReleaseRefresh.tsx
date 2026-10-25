"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Consulta otra vez al servidor al vencer un estreno, sin enviar contenido oculto. */
export function ReleaseRefresh({ at, serverNow }: { at?: string; serverNow: number }) {
  const router = useRouter();

  useEffect(() => {
    if (!at || !Number.isFinite(Date.parse(at))) return;
    // Tiempo monotónico: cambiar el reloj del dispositivo no adelanta el estreno.
    const deadline = performance.now() + Math.max(0, Date.parse(at) - serverNow);
    let timer: ReturnType<typeof setTimeout>;
    function schedule() {
      const remaining = deadline - performance.now();
      if (remaining <= 0) {
        router.refresh();
        return;
      }
      timer = setTimeout(schedule, Math.min(remaining, 60_000));
    }
    function onVisibilityChange() {
      if (document.visibilityState === "visible") router.refresh();
    }
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) router.refresh();
    }
    schedule();
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [at, serverNow, router]);

  return null;
}
