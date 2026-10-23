import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

// Accueil provisoire (Phase 1). La version complète, alimentée par Sanity, arrive en Phase 3.
export default async function HomePage() {
  const t = await getTranslations();

  return (
    <Container className="py-20 sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        {t("Home.role")}
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span className="block text-2xl font-semibold text-muted sm:text-3xl">
          {t("Home.greeting")}
        </span>
        {t("Meta.siteName")}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{t("Home.pitch")}</p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          {t("Nav.projects")}
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          {t("Nav.contact")}
        </Link>
      </div>
    </Container>
  );
}
