import { getTranslations } from "next-intl/server";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Adresse d'une page de liste : page 1 = basePath, sinon basePath/page/N. */
export function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
}

/** Pagination : « précédent », numéros de page, « suivant ». */
export async function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const t = await getTranslations("Pagination");
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const itemClass =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-border px-3 text-sm font-medium transition-colors";

  return (
    <nav aria-label={t("label")} className="mt-14 flex flex-col items-center gap-4">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 && (
          <li>
            <Link href={pageHref(basePath, page - 1)} rel="prev" aria-label={t("previous")} className={cn(itemClass, "hover:border-accent hover:text-accent")}>
              <FaArrowLeft aria-hidden="true" className="h-3 w-3" />
            </Link>
          </li>
        )}
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={pageHref(basePath, n)}
              aria-label={t("page", { page: n })}
              aria-current={n === page ? "page" : undefined}
              className={cn(
                itemClass,
                n === page
                  ? "border-accent bg-accent text-accent-foreground"
                  : "hover:border-accent hover:text-accent",
              )}
            >
              {n}
            </Link>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link href={pageHref(basePath, page + 1)} rel="next" aria-label={t("next")} className={cn(itemClass, "hover:border-accent hover:text-accent")}>
              <FaArrowRight aria-hidden="true" className="h-3 w-3" />
            </Link>
          </li>
        )}
      </ul>
      <p className="text-sm text-muted">{t("status", { page, total: totalPages })}</p>
    </nav>
  );
}
