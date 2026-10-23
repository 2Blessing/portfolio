import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { getProfile } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";

// Accueil provisoire (Phase 2) : affiche le Profil Sanity pour tester la connexion.
// La version complète (projets, articles, CV…) arrive en Phase 3.
export default async function HomePage() {
  const t = await getTranslations();
  const profile = await getProfile(await getCurrentLocale());

  // Si le Profil n'est pas encore rempli dans Sanity, on affiche des textes par défaut.
  const name = profile?.name ?? t("Meta.siteName");
  const headline = profile?.headline ?? t("Home.role");
  const tagline = profile?.tagline ?? t("Home.pitch");

  return (
    <Container className="grid items-center gap-12 py-20 sm:py-28 md:grid-cols-[1fr_auto]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{headline}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="block text-2xl font-semibold text-muted sm:text-3xl">
            {t("Home.greeting")}
          </span>
          {name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{tagline}</p>

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
      </div>

      {profile?.photo?.asset && (
        <Image
          src={urlFor(profile.photo).width(640).height(640).url()}
          alt={profile.photo.alt ?? name}
          width={320}
          height={320}
          priority
          className="mx-auto h-56 w-56 rounded-full border-4 border-surface object-cover shadow-lg sm:h-72 sm:w-72"
        />
      )}
    </Container>
  );
}
