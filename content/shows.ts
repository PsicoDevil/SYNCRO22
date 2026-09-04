import type { Show } from "./types";

/**
 * Shows de SYNCRO22.
 *
 * Fuentes: únicamente los flyers oficiales en /public/shows/ (revisados
 * visualmente) más fechas confirmadas por la banda.
 *
 * Reglas de carga:
 * - Si un dato no aparece claramente en el flyer, se deja vacío (null) — no se infiere.
 * - `date` (ISO completo) SOLO cuando el año es visible en el flyer;
 *   si el año falta, queda null y la fecha visible vive en `dateLabel`.
 * - `status`: "upcoming" solo para fechas futuras confirmadas. Los shows con
 *   año pendiente se cargan como "past" (archivo histórico) hasta confirmarse.
 * - Orden: cronológico (más antiguo → más nuevo). Para agregar un show nuevo,
 *   insertarlo en su posición cronológica y definir `status`.
 * - Historial: los ids de `historialFirstIds` aparecen primero (orden visual);
 *   el resto se ordena cronológicamente, de más reciente a más antiguo.
 * - Fechas futuras confirmadas (status "upcoming") se muestran en la sección
 *   "Próximas fechas" de la página.
 * - Nombres de archivo definitivos y descriptivos; igualmente la fecha/hora/lugar
 *   NUNCA se deducen del nombre del archivo, sino del contenido del flyer.
 */
export const shows: Show[] = [
  {
    // Flyer: "Sábado 21/02/26 — 22 hs. — Rincón Universitario" (año visible).
    id: "festi-disruptivo",
    date: "2026-02-21",
    dateLabel: "Sábado 21/02/26",
    time: "22:00 hs",
    title: "Festi Disruptivo",
    venue: "Rincón Universitario",
    flyer: "/shows/festi-disruptivo.jpeg",
    status: "past",
  },
  {
    // Flyer: "6 de marzo — 22:00 hs — en el Rincón Universitario" (sin año).
    id: "power-punk-fest",
    date: null,
    dateLabel: "6 de marzo",
    time: "22:00 hs",
    title: "Power Punk Fest",
    venue: "Rincón Universitario",
    flyer: "/shows/power-punk-fest.jpeg",
    status: "past", // Año pendiente de confirmación (no figura en el flyer).
  },
  {
    // Flyer: "Viernes 10 de abril — 23:30 hs — 1 de Mayo 1296 — Entrada libre y gratuita" (sin año).
    id: "parador-sur-abril",
    date: null,
    dateLabel: "Viernes 10 de abril",
    time: "23:30 hs",
    title: "Parador Sur",
    address: "1 de Mayo 1296",
    flyer: "/shows/parador-sur-abril.jpeg",
    notes: "Entrada libre y gratuita",
    status: "past", // Año pendiente de confirmación (no figura en el flyer).
  },
  {
    // Flyer: "Sábado 9 de Mayo — Apertura 22hs — Doctor Enrique Ocampo 140, San Isidro, Valle Viejo" (sin año).
    id: "terminal-3s-circo-nuclear",
    date: null,
    dateLabel: "Sábado 9 de mayo",
    time: "22:00 hs",
    title: "Terminal 3S + Circo Nuclear",
    address: "Doctor Enrique Ocampo 140",
    city: "San Isidro, Valle Viejo",
    flyer: "/shows/terminal-3s-circo-nuclear.jpeg",
    notes: "Apertura del evento · Entrada libre",
    status: "past", // Año pendiente de confirmación (no figura en el flyer).
  },
  {
    // Flyer: "6 de junio — 22:00 hs" (flyer recuperado y renombrado en /public/shows/).
    id: "parador-sur-bdlr-borderline",
    date: null,
    dateLabel: "6 de junio",
    time: "22:00 hs",
    title: "Parador Sur + BDLR / Borderline",
    address: "1 de Mayo 1296, Esq. Rioja",
    flyer: "/shows/parador-sur-bdlr-junio.jpeg",
    status: "past", // Año pendiente de confirmación.
  },
  {
    // Flyer: "Expo Feria Inclusiva del Chavarría — Cronograma — Fecha: 09 de Octubre — 12:00 hs Banda de Rock - SYNCRO 22" (sin año).
    id: "expo-feria-inclusiva-chavarria",
    date: null,
    dateLabel: "9 de octubre",
    time: "12:00 hs",
    title: "Expo Feria Inclusiva del Chavarría",
    flyer: "/shows/expo-feria-chavarria.jpeg",
    notes: "Presentación en el cronograma: Banda de Rock — SYNCRO 22",
    status: "past", // Año pendiente de confirmación (no figura en el flyer).
  },
  {
    // Flyer: "PONCHO 2026 — Escenario Patio Matero — Domingo 19 — 21:30hs" (año visible; mes no indicado).
    id: "poncho-2026-patio-matero",
    date: null, // Mes no indicado en el flyer → fecha completa pendiente.
    dateLabel: "Domingo 19",
    time: "21:30 hs",
    title: "Poncho 2026",
    venue: "Escenario Patio Matero",
    flyer: "/shows/poncho-2026.jpeg",
    status: "past", // Mes pendiente de confirmación (no figura en el flyer).
  },
  {
    // Flyer: "Rockeada Solidaria — ISAC Palooza — 22 de noviembre Día de la Música — 17HS — Alem entre San Martín y República" (sin año).
    id: "rockeada-solidaria-isac",
    date: null,
    dateLabel: "22 de noviembre",
    time: "17:00 hs",
    title: "Rockeada Solidaria — ISAC Palooza",
    address: "Alem entre San Martín y República",
    flyer: "/shows/rockeada-solidaria-isac.jpeg",
    notes: "Día de la Música",
    status: "past", // Año pendiente de confirmación (no figura en el flyer).
  },
];

/**
 * Orden de los primeros shows del historial (curaduría visual, no
 * cronológica). El resto del historial sigue en orden cronológico inverso.
 */
export const historialFirstIds = [
  "power-punk-fest",
  "festi-disruptivo",
  "parador-sur-bdlr-junio",
] as const;