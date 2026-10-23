// Liste des pages du menu. `key` correspond à une clé de "Nav" dans les fichiers de traduction.
export const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "journey", href: "/journey" },
  { key: "skills", href: "/skills" },
  { key: "projects", href: "/projects" },
  { key: "cv", href: "/cv" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

/** Vrai si `pathname` correspond à l'entrée du menu (sous-pages comprises). */
export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
