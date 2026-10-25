/**
 * Tipos de contenido de SYNCRO22.
 *
 * Estos tipos definen el contrato entre los datos y la UI.
 * Cuando se conecte un CMS, solo se reemplaza la capa de datos
 * (content/*.ts) por fetches a la API — la UI no cambia.
 */

export type ReleaseType = "album" | "ep" | "single";

export interface LyricBlock {
  /** Verso cantado, indicación de estructura o anotación de ensayo. */
  type: "verse" | "cue" | "note";
  text: string;
}

export interface SongLyrics {
  /** Título original: conserva explícitamente la correspondencia con la fuente. */
  sourceTitle: string;
  sourceDocument: string;
  sourcePage: number;
  blocks: LyricBlock[];
}

/** Una canción se carga una sola vez y puede integrar varios lanzamientos. */
export interface Song {
  id: string;
  title: string;
  duration?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  /** Ausente cuando la letra está pendiente de carga. */
  lyrics?: SongLyrics;
}

export interface Track extends Song {
  trackNumber: number;
}

export interface StreamingLinks {
  spotify?: string;
  youtube?: string;
  appleMusic?: string;
  deezer?: string;
  bandcamp?: string;
}

export interface Release {
  id: string;
  title: string;
  artist?: string;
  slug: string;
  type: ReleaseType;
  releaseDate?: string;
  /** Fecha visible opcional; no cambia las reglas de disponibilidad del audio. */
  displayReleaseDate?: string;
  /** Embargo del álbum: no enviar su ficha al navegador antes de esta fecha. */
  revealAt?: string;
  featured?: boolean;
  webExclusive?: boolean;
  /** Preescucha del single al ejecutar next dev; no adelanta su estreno público. */
  audioPreview?: boolean;
  year?: number;
  cover?: string;
  description?: string;
  tracks: Track[];
  streamingLinks: StreamingLinks;
}

export interface Show {
  id: string;
  /**
   * Fecha completa en ISO (YYYY-MM-DD) SOLO cuando el año figura claramente
   * en el flyer. null = año pendiente de confirmación (no se infiere).
   */
  date: string | null;
  /** Fecha visible tal como figura en el flyer (ej. "Sábado 21/02/26"). */
  dateLabel: string;
  /** Hora del show tal como figura en el flyer. */
  time?: string;
  /** Nombre del evento / festival. */
  title: string;
  venue?: string;
  /** Dirección textual tal como figura en el flyer. */
  address?: string;
  city?: string;
  country?: string;
  /** Flyer oficial (ruta dentro de /public). */
  flyer?: string;
  /** Dato adicional claramente visible en el flyer (ej. "Entrada libre"). */
  notes?: string;
  ticketsUrl?: string;
  status: "upcoming" | "past";
}

export interface Video {
  id: string;
  title: string;
  /**
   * ID de YouTube del video — la reproducción se realiza vía embed
   * (https://www.youtube.com/embed/{youtubeId}). Los archivos de video
   * pesados no se sirven desde el repositorio.
   */
  youtubeId: string;
  /** Poster generado a partir de un fotograma del propio video. */
  poster?: string;
  /** Categoría visible (ej. LIVE, COVER, VIDEO DE ESTUDIO). */
  category?: string;
  description?: string;
  publishedAt?: string;
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  /** Fecha ISO (YYYY-MM-DD). Opcional: se omite cuando no es visible/confirmada. */
  date?: string;
  excerpt?: string;
  body?: string;
  image?: string;
  slug: string;
}

export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  spotify?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
}

/**
 * Información biográfica de un integrante.
 *
 * Todos los campos son opcionales porque no necesariamente
 * todos los integrantes tienen su ficha completa todavía.
 */
export interface MemberBio {
  shortBio?: string;
  trajectory?: string;
  howJoined?: string;
  influences?: string;
  personalNote?: string;
}

/**
 * Integrante de SYNCRO22.
 */
export interface Member {
  id: string;
  name: string;
  role?: string;
  photo?: string;
  youtubeUrl?: string;
  bio?: MemberBio;
}

export interface Site {
  name: string;
  tagline: string;
  description: string;
  social: SocialLinks;
  contactEmail?: string;
  bookingEmail?: string;
  /** Fecha de lanzamiento del disco (ISO 8601 con zona horaria). */
  releaseDate?: string;
  /** Biografía oficial de la banda, dividida en párrafos. */
  biography?: string[];
}
