"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems, isActive } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Props = {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

/**
 * Liens du menu, avec la page en cours mise en évidence.
 * Lire l'URL (usePathname) doit se faire dans <Suspense> avec cacheComponents :
 * en attendant, on affiche les mêmes liens sans mise en évidence.
 */
export function NavLinks(props: Props) {
  return (
    <Suspense fallback={<NavList {...props} activePath={null} />}>
      <ActiveNavLinks {...props} />
    </Suspense>
  );
}

function ActiveNavLinks(props: Props) {
  const pathname = usePathname();
  return <NavList {...props} activePath={pathname} />;
}

function NavList({ variant, onNavigate, activePath }: Props & { activePath: string | null }) {
  const t = useTranslations("Nav");

  return (
    <ul className={cn(variant === "desktop" ? "flex items-center gap-1" : "flex flex-col gap-1")}>
      {navItems.map((item) => {
        const active = activePath !== null && isActive(activePath, item.href);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-md font-medium transition-colors",
                variant === "desktop" ? "px-3 py-2 text-sm" : "px-3 py-3 text-base",
                active ? "text-accent" : "text-muted hover:bg-surface hover:text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
