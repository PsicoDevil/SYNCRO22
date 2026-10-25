import { site } from "@/content/site";

/** URL estable; el archivo original vive fuera de public y se sirve mediante una ruta. */
export const albumCoverUrl = "/album/9-peldanos-cover.png";

export const albumCoverCacheHeaders = {
  "Cache-Control": "private, no-store, max-age=0, must-revalidate",
  "CDN-Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

/** Ante una fecha ausente o inválida, la portada permanece protegida. */
export function isAlbumCoverReleased(now: number): boolean {
  const releaseTime = Date.parse(site.releaseDate ?? "");
  return Number.isFinite(releaseTime) && now >= releaseTime;
}

export function isAlbumCoverPath(pathname: string): boolean {
  try {
    return decodeURIComponent(pathname).replace(/\/{2,}/g, "/").toLowerCase() === albumCoverUrl;
  } catch {
    return false;
  }
}
