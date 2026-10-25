import { readFile } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { albumCoverCacheHeaders, isAlbumCoverReleased } from "@/lib/album-cover";

export const runtime = "nodejs";

export async function GET() {
  await connection();
  if (!isAlbumCoverReleased(Date.now())) {
    return new Response(null, { status: 404, headers: albumCoverCacheHeaders });
  }

  const cover = await readFile(path.join(process.cwd(), "private", "album", "9-peldanos-cover.png"));
  return new Response(new Uint8Array(cover), {
    headers: { ...albumCoverCacheHeaders, "Content-Type": "image/png" },
  });
}
