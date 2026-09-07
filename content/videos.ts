import type { Video } from "./types";

/**
 * Videos oficiales de SYNCRO22.
 *
 * Archivos originales en /public/video (NO renombrar ni mover):
 * - "Nochecita LIVE.mp4" (h264/AAC)
 * - "Sweet Dreams COVER.mp4" (h264/AAC)
 * - "Syncro 22 💀 - Nochecita en el jumeal (Video de estudio).mkv"
 *   (contenedor MKV no soportado por <video>; se sirve la copia
 *   remuxada "nochecita-en-el-jumeal-estudio.mp4" — h264/AAC, faststart).
 *
 * Los posters son fotogramas reales extraídos de cada video
 * (/public/video/posters/).
 */
export const videos: Video[] = [
  {
    id: "nochecita-jumeal-estudio",
    title: "Syncro 22 - Nochecita en el jumeal",
    category: "Video de estudio",
    src: "/video/nochecita-en-el-jumeal-estudio.mp4",
    poster: "/video/posters/nochecita-jumeal.jpg",
    featured: true,
  },
  {
    id: "nochecita-live",
    title: "Nochecita",
    category: "LIVE",
    src: "/video/Nochecita LIVE.mp4",
    poster: "/video/posters/nochecita-live.jpg",
  },
  {
    id: "sweet-dreams-cover",
    title: "Sweet Dreams",
    category: "COVER",
    src: "/video/Sweet Dreams COVER.mp4",
    poster: "/video/posters/sweet-dreams-cover.jpg",
  },
];