import type { Release } from "./types";
import { songs } from "./songs";
import { site } from "./site";
import { albumCoverUrl } from "@/lib/album-cover";

/**
 * Discografía de SYNCRO22.
 * Las canciones se mantienen en songs.ts y se referencian aquí, en orden.
 * No asignar a un lanzamiento material cuya pertenencia no esté confirmada.
 */
export const releases: Release[] = [
  {
    id: "salamanca",
    slug: "9-peldanos",
    title: "9 Peldaños",
    artist: "SYNCRO22",
    type: "album",
    releaseDate: site.releaseDate,
    revealAt: site.releaseDate,
    cover: albumCoverUrl,
    tracks: [
      songs.salamanca,
      songs["corazon-ejecutor"],
      songs.amarre,
      songs["caramelo-oscuro"],
      songs["sin-nombre"],
      songs["nochecita-en-el-jumeal"],
      songs.posesion,
      songs["lenguas-largas"],
      songs["espada-de-tinta"],
    ].map((song, index) => ({
      ...song,
      trackNumber: index + 1,
    })),
    streamingLinks: {},
  },
  {
    id: "posesion-single",
    slug: "posesion",
    title: "POSESIÓN",
    artist: "SYNCRO22",
    type: "single",
    releaseDate: "2026-10-24T00:00:00-03:00",
    displayReleaseDate: "2026-10-25T00:00:00-03:00",
    featured: true,
    webExclusive: true,
    audioPreview: true,
    cover: "/singles/posesion-cover.png",
    tracks: [{ ...songs.posesion, audioUrl: "/audio/posesion.wav", trackNumber: 1 }],
    streamingLinks: {},
  },
  {
    id: "nochecita-en-el-jumeal-single",
    slug: "nochecita-en-el-jumeal",
    title: songs["nochecita-en-el-jumeal"].title,
    artist: "SYNCRO22",
    type: "single",
    cover: "/singles/nochesingle.png",
    tracks: [{ ...songs["nochecita-en-el-jumeal"], trackNumber: 1 }],
    streamingLinks: {},
  },
];

export const debutAlbum = releases.find((release) => release.id === "salamanca")!;

const assignedSongIds = new Set(
  releases.flatMap((release) => release.tracks.map((track) => track.id))
);

/** Material del documento que todavía no tiene lanzamiento confirmado. */
export const unassignedSongs = Object.values(songs).filter(
  (song) => !assignedSongIds.has(song.id)
);
