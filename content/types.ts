/**
 * Tipos de contenido de SYNCRO22.
 *
 * Estos tipos definen el contrato entre los datos y la UI.
 * Cuando se conecte un CMS, solo se reemplaza la capa de datos
 * (content/*.ts) por fetches a la API — la UI no cambia.
 */

export type ReleaseType = "album" | "ep" | "single";

export interface Track {
  id: string;
  trackNumber: number;
  title: string;
  duration?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
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
  slug: string;
  type: ReleaseType;
  releaseDate?: string;
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
  youtubeId: string;
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
  date: string;
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

export interface Member {
  id: string;
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
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
