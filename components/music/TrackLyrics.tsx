import type { Song } from "@/content/types";

interface TrackLyricsProps {
  song: Song;
  context: string;
  trackNumber?: number;
}

/** Desplegable nativo: teclado, foco y lectura disponibles sin JavaScript. */
export function TrackLyrics({ song, context, trackNumber }: TrackLyricsProps) {
  const lyrics = song.lyrics;
  // Solo texto cantado: las indicaciones de la fuente nunca se publican.
  // BIS y x3 son marcas de ensayo al final del verso, no palabras cantadas.
  const verses = lyrics?.blocks
    .filter((block) => block.type === "verse")
    .map((block) => block.text.replace(/[ \t]+(?:BIS|x3)(?=\r?$)/gm, ""))
    .filter((text) => text.trim()) ?? [];
  const hasLyrics = verses.length > 0;

  return (
    <details
      id={`letra-${context}-${song.id}`}
      className="group/track min-w-0 scroll-mt-24 border-b border-steel open:bg-ink/70"
    >
      <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-4 py-5 transition-colors hover:bg-ash/40 focus-visible:outline-offset-[-2px] sm:gap-6 sm:px-6 [&::-webkit-details-marker]:hidden">
        {trackNumber !== undefined ? (
          <span className="tech-label shrink-0 text-blood" aria-hidden="true">
            {String(trackNumber).padStart(2, "0")}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">
          <span className="block break-words text-lg font-semibold text-bone sm:text-xl">
            {song.title}
          </span>
          <span className="mt-1 block text-xs text-fog">
            {hasLyrics ? (
              <>
                <span className="group-open/track:hidden">Ver letra</span>
                <span className="hidden group-open/track:inline">Cerrar letra</span>
              </>
            ) : "Letra pendiente de carga"}
          </span>
        </span>
        {song.duration ? (
          <span className="shrink-0 font-mono text-xs text-fog">{song.duration}</span>
        ) : null}
        <span
          aria-hidden="true"
          className="text-2xl font-light text-blood transition-transform duration-300 group-open/track:rotate-45 motion-reduce:transition-none"
        >
          +
        </span>
      </summary>

      <div className="min-w-0 border-t border-steel/50 px-5 py-8 sm:px-16 sm:py-10">
        {hasLyrics && lyrics ? (
          <>
            {lyrics.sourceTitle !== song.title ? (
              <p className="mb-8 text-xs leading-relaxed text-fog">
                Título en el documento: <span className="text-bone">{lyrics.sourceTitle}</span>
              </p>
            ) : null}
            <div className="flex max-w-2xl flex-col gap-6">
              {verses.map((text, index) => (
                  <p
                    key={index}
                    className="whitespace-pre-wrap break-words text-base leading-8 text-bone sm:text-lg sm:leading-9"
                  >
                    {text}
                  </p>
              ))}
            </div>
            <p className="mt-8 text-xs text-smoke">
              Fuente: {lyrics.sourceDocument} · pág. {lyrics.sourcePage}
            </p>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-fog">Letra pendiente de carga.</p>
        )}
        {song.spotifyUrl || song.youtubeUrl || song.audioUrl ? (
          <div className="mt-6 flex flex-wrap gap-6 text-sm text-bone">
            {[
              { href: song.spotifyUrl, label: "Escuchar en Spotify" },
              { href: song.youtubeUrl, label: "Ver en YouTube" },
              { href: song.audioUrl, label: "Escuchar canción" },
            ].map(({ href, label }) => href ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-blood underline-offset-4 hover:text-blood">
                {label} ↗
              </a>
            ) : null)}
          </div>
        ) : null}
      </div>
    </details>
  );
}
