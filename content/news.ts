import type { NewsItem } from "./types";

/**
 * Noticias de SYNCRO22.
 *
 * Título, texto e imagen corresponden al certificado real ubicado en
 * /public/news/certificado.jpeg. No se inventa fecha (no es visible
 * en el certificado).
 */
export const news: NewsItem[] = [
  {
    id: "certificado-expoferia-inclusiva-chavarria",
    title: "Certificado de Reconocimiento — ExpoFeria Inclusiva del Chavarría",
    excerpt:
      "Por su destacada participación, esfuerzo y dedicación durante la Expo. Su contribución fue clave para enriquecer la propuesta presentada, promoviendo activamente un espacio más inclusivo y colaborativo.",
    image: "/news/certificado.jpeg",
    slug: "certificado-expoferia-inclusiva-chavarria",
  },
];