import { cache } from "react";
import { connection } from "next/server";

/** Una lectura del reloj por petición, compartida por metadata y contenido. */
export const getMusicRequestTime = cache(async (): Promise<number> => {
  await connection();
  return Date.now();
});
