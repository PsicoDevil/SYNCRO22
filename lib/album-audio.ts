/** Versiones web del álbum, en el orden oficial, servidas como archivos estáticos. */
export const albumAudioFiles: Record<string, string> = {
  salamanca: "01 - Salamanca.mp3",
  "corazon-ejecutor": "02 - Corazon Ejecutor.mp3",
  amarre: "03 - Amarre.mp3",
  "caramelo-oscuro": "04 - Caramelo Oscuro.mp3",
  "sin-nombre": "05 - SN.mp3",
  "nochecita-en-el-jumeal": "06 - Nochecita En El Jumeal.mp3",
  posesion: "07 - POSESION.mp3",
  "lenguas-largas": "08 - Lenguas Largas.mp3",
  "espada-de-tinta": "09 - Espada De Tinta.mp3",
};

export function albumAudioUrl(songId: string): string {
  if (!Object.hasOwn(albumAudioFiles, songId)) {
    throw new Error(`Audio del álbum no encontrado: ${songId}`);
  }
  return `/album/audio/${encodeURIComponent(albumAudioFiles[songId])}`;
}
