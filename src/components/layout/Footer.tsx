import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { getCurrentLocale } from "@/i18n/locale";
import { navItems } from "@/lib/nav";
import { getProfile } from "@/sanity/lib/data";

/** Pied de page : liens rapides, réseaux sociaux (depuis le Profil Sanity), droits. */
export async function Footer() {
  const t = await getTranslations();
  const year = await getCurrentYear();
  const profile = await getProfile(await getCurrentLocale());
  const name = profile?.name ?? t("Meta.siteName");

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-bold">
            {name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-2 text-sm text-muted">{profile?.headline ?? t("Footer.tagline")}</p>
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

        {/* Affiché seulement si au moins un réseau est renseigné dans le Profil */}
        {profile?.socialLinks && profile.socialLinks.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold">{t("Footer.social")}</h2>
            <SocialLinks links={profile.socialLinks} className="mt-3" />
          </div>
        )}
      </Container>

      <div className="border-t border-border">
        <Container className="py-6 text-center text-xs text-muted">
          © {year} {name}. {t("Footer.rights")}
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
