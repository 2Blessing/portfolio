/**
 * Adresse publique du site, sans "/" final (variable NEXT_PUBLIC_SITE_URL).
 * Sert à construire des liens complets : partage, SEO, sitemap.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Lien complet vers une page : absoluteUrl("/fr/blog/mon-article"). */
export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
