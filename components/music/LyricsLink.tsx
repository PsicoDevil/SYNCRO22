"use client";

interface LyricsLinkProps {
  targetId: string;
  title: string;
}

/** Abre la ficha existente antes de mover el foco; la letra no se duplica. */
export function LyricsLink({ targetId, title }: LyricsLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={`Ver letra de ${title}`}
      className="tech-label mt-6 inline-flex min-h-11 items-center gap-3 border-b border-blood py-3 text-bone transition-colors hover:text-blood"
      onClick={(event) => {
        const panel = document.getElementById(targetId);
        if (!(panel instanceof HTMLDetailsElement)) return;
        event.preventDefault();
        panel.open = true;
        panel.querySelector("summary")?.focus({ preventScroll: true });
        panel.scrollIntoView({ block: "start" });
      }}
    >
      Ver letra <span aria-hidden="true">↗</span>
    </a>
  );
}
