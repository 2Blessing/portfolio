import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/shared/SanityImage";
import { getProfile } from "@/sanity/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Nav.about"), description: t("About.intro") };
}

/** À propos : présentation détaillée, photo, centres d'intérêt, langues. */
export default async function AboutPage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const profile = await getProfile(locale);

  const interests = profile?.interests ?? [];
  const languages = profile?.languages ?? [];

  return (
    <>
      <PageHeader title={t("Nav.about")} intro={t("About.intro")} />

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_320px]">
        {/* Texte de présentation */}
        <div>
          {profile?.bio && profile.bio.length > 0 ? (
            <RichText value={profile.bio} />
          ) : (
            <p className="text-lg text-muted">{t("About.noBio")}</p>
          )}
        </div>

        {/* Colonne latérale : photo, langues, centres d'intérêt */}
        <aside className="space-y-10">
          {profile?.photo?.asset && (
            <SanityImage
              image={profile.photo}
              alt={profile.photo.alt ?? profile.name}
              width={640}
              height={800}
              sizes="(min-width: 1024px) 320px, 100vw"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          )}

          {languages.length > 0 && (
            <section aria-labelledby="languages-title">
              <h2 id="languages-title" className="text-lg font-bold">
                {t("About.languages")}
              </h2>
              <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
                {languages.map((lang) => (
                  <li key={lang._key} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <span className="font-medium">{lang.name}</span>
                    {lang.level && <span className="text-muted">{lang.level}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {interests.length > 0 && (
            <section aria-labelledby="interests-title">
              <h2 id="interests-title" className="text-lg font-bold">
                {t("About.interests")}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest}>
                    <Badge tone="accent">{interest}</Badge>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </Container>

      {/* Appel à l'action */}
      <section className="border-t border-border bg-surface">
        <Container className="flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t("About.ctaTitle")}</h2>
            <p className="mt-2 text-muted">{t("About.ctaText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/journey" variant="secondary">
              {t("Nav.journey")}
            </ButtonLink>
            <ButtonLink href="/cv" variant="secondary">
              {t("Nav.cv")}
            </ButtonLink>
            <ButtonLink href="/contact">{t("Home.ctaContact")}</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
