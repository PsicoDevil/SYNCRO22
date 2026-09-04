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