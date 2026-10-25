import { NextResponse, type NextRequest } from "next/server";
import { albumCoverCacheHeaders, isAlbumCoverPath, isAlbumCoverReleased } from "@/lib/album-cover";

/** Bloquea también las copias optimizadas que pudieran estar en caché. */
export function proxy(request: NextRequest) {
  let isCover = isAlbumCoverPath(request.nextUrl.pathname);
  if (request.nextUrl.pathname === "/_next/image") {
    const source = request.nextUrl.searchParams.get("url");
    if (source) {
      try {
        isCover = isAlbumCoverPath(new URL(source, request.url).pathname);
      } catch {
        // Las URLs inválidas se dejan a la validación propia del optimizador.
      }
    }
  }

  if (isCover && !isAlbumCoverReleased(Date.now())) {
    return new NextResponse(null, { status: 404, headers: albumCoverCacheHeaders });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/album/:path*", "/_next/image"],
};
