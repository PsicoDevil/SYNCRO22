import { site } from "@/content/site";

/** URL base del sitio (para metadata/SEO). */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://syncro22.com";

/** Nombre de la banda. */
export const siteName = site.name;

/** Tagline de la banda. */
export const siteTagline = site.tagline;

/** Descripción del sitio. */
export const siteDescription = site.description;

/** Redes sociales de la banda. */
export const socialLinks = site.social;

/** Email receptor de contacto. */
export const siteContactEmail = site.contactEmail;

/** Orden y numeración oficial de navegación, compartidos con los encabezados. */
export const siteNavigation = {
  inicio: { href: "/", label: "Inicio", index: "01" },
  musica: { href: "/musica", label: "Música", index: "02" },
  videos: { href: "/videos", label: "Videos", index: "03" },
  shows: { href: "/shows", label: "Shows", index: "04" },
  galeria: { href: "/galeria", label: "Galería", index: "05" },
  integrantes: { href: "/integrantes", label: "Integrantes", index: "06" },
  noticias: { href: "/noticias", label: "Noticias", index: "07" },
  contacto: { href: "/contacto", label: "Contacto", index: "08" },
} as const;

export const navigationItems = Object.values(siteNavigation);
/** Header de escritorio y footer conservan sus enlaces internos actuales. */
export const internalNavigationItems = navigationItems.filter((item) => item.href !== "/");
