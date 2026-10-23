"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { NavLinks } from "./NavLinks";

/** Menu « hamburger » pour téléphone et tablette. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("A11y");
  const tNav = useTranslations("Nav");

  // Quand le menu est ouvert : Échap ou bouton « retour » le ferment,
  // et la page derrière ne défile plus.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    window.addEventListener("popstate", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t("closeMenu") : t("openMenu")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={tNav("mainLabel")}
          // Hauteur explicite : le flou de l'en-tête (backdrop-blur) change le repère de "fixed".
          className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background px-4 py-4"
        >
          <NavLinks variant="mobile" onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
