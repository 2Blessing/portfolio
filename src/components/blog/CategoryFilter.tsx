import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/sanity/lib/types";

/**
 * Filtre par catégorie : une pastille par catégorie (avec le nombre d'articles).
 * Ce sont de simples liens vers des pages pré-rendues : aucun JavaScript nécessaire.
 */
export async function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[];
  active: string | null; // slug de la catégorie affichée, ou null pour « Tous »
}) {
  if (categories.length === 0) return null;
  const t = await getTranslations("Blog");

  const items = [
    { slug: null, title: t("all"), href: "/blog", count: null as number | null },
    ...categories.map((c) => ({ slug: c.slug, title: c.title, href: `/blog/category/${c.slug}`, count: c.count })),
  ];

  return (
    <nav aria-label={t("filterLabel")} className="mb-10">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.slug ?? "all"}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent hover:text-accent",
                )}
              >
                {item.title}
                {item.count !== null && <span className="text-xs opacity-75">{item.count}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
