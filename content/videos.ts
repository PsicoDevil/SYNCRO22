import type { Video } from "./types";

/**
 * Videos oficiales de SYNCRO22.
 *
 * Alojados en YouTube — se reproducen vía embed en la sección /videos.
 * Los archivos pesados originales (mp4/mkv) NO se sirven desde el
 * repositorio (ver .gitignore) y el código ya no depende de ellos.
 *
 * Los posters son fotogramas reales extraídos de cada video
 * (/public/video/posters/ — archivos livianos).
 */
export const videos: Video[] = [
  {
    id: "nochecita-jumeal-estudio",
    title: "Syncro 22 - Nochecita en el jumeal",
    category: "Video de estudio",
    youtubeId: "rlGc0OUzlsE",
    poster: "/video/posters/nochecita-jumeal.jpg",
    featured: true,
  },
  {
    id: "nochecita-live",
    title: "Nochecita",
    category: "LIVE",
    youtubeId: "Vshn7fIhWcA",
    poster: "/video/posters/nochecita-live.jpg",
  },
  {
    id: "sweet-dreams-cover",
    title: "Sweet Dreams",
    category: "COVER",
    youtubeId: "NlzNBWcgsdg",
    poster: "/video/posters/sweet-dreams-cover.jpg",
  },
];