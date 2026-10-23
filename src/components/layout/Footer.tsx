import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/lib/nav";

/**
 * Pied de page : liens rapides, réseaux, droits.
 * Les réseaux sociaux viendront de Sanity (Profil) en Phase 2.
 */
export async function Footer() {
  const t = await getTranslations();
  const year = await getCurrentYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">
            {t("Meta.siteName")}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-sm text-muted">{t("Footer.tagline")}</p>
        </div>

        <nav aria-label={t("Footer.quickLinks")}>
          <h2 className="text-sm font-semibold">{t("Footer.quickLinks")}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="text-muted transition-colors hover:text-accent">
                  {t(`Nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold">{t("Footer.social")}</h2>
          {/* Rempli depuis Sanity en Phase 2 */}
          <p className="mt-3 text-sm text-muted">LinkedIn · GitHub · WhatsApp · Instagram</p>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-6 text-center text-xs text-muted">
          © {year} {t("Meta.siteName")}. {t("Footer.rights")}
        </Container>
      </div>
    </footer>
  );
}

/** Année en cours, mise en cache (obligatoire avec cacheComponents). */
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}
