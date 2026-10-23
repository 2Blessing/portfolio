"use client";

import { Suspense } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const className =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:bg-surface hover:text-foreground";

/**
 * Lien FR ↔ EN qui garde la page en cours.
 * En attendant de connaître l'URL (Suspense), le lien pointe vers l'accueil de l'autre langue.
 */
export function LanguageSwitcher() {
  return (
    <Suspense fallback={<SwitchLink href="/" />}>
      <CurrentPageSwitch />
    </Suspense>
  );
}

function CurrentPageSwitch() {
  // Chemin sans la langue, ex. "/projects/mon-projet"
  const pathname = usePathname();
  return <SwitchLink href={pathname} />;
}

function SwitchLink({ href }: { href: string }) {
  const locale = useLocale();
  const t = useTranslations("A11y");
  const target = locale === "fr" ? "en" : "fr";

  return (
    <Link
      href={href}
      locale={target}
      hrefLang={target}
      aria-label={t("switchTo")}
      title={t("switchLanguage")}
      className={className}
    >
      {target}
    </Link>
  );
}
