import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

/** En-tête collant en haut de page : nom, menu, langue, thème. */
export async function Header() {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          {t("Meta.siteName")}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label={t("Nav.mainLabel")} className="hidden lg:block">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
