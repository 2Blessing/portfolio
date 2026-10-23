import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Timeline } from "@/components/sections/Timeline";
import { getJourney, getProfile } from "@/sanity/lib/data";
import type { JourneyKind } from "@/sanity/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Nav.journey"), description: t("Journey.intro") };
}

// Ordre des rubriques sur la page
const kinds: JourneyKind[] = ["education", "experience", "internship", "certification"];

/** Parcours : frises par rubrique, puis langues et centres d'intérêt (depuis le Profil). */
export default async function JourneyPage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const [entries, profile] = await Promise.all([getJourney(locale), getProfile(locale)]);

  // Regroupe les entrées par type (formation, expérience…), en gardant l'ordre chronologique.
  const groups = kinds
    .map((kind) => ({ kind, items: entries.filter((e) => e.kind === kind) }))
    .filter((g) => g.items.length > 0);

  const languages = profile?.languages ?? [];
  const interests = profile?.interests ?? [];

  // Sommaire : seulement les rubriques qui ont du contenu
  const toc = [
    ...groups.map((g) => g.kind),
    ...(languages.length ? ["languages" as const] : []),
    ...(interests.length ? ["interests" as const] : []),
  ];

  return (
    <>
      <PageHeader title={t("Nav.journey")} intro={t("Journey.intro")} />

      <Container className="py-16 sm:py-20">
        {toc.length === 0 && <p className="text-muted">{t("Common.empty")}</p>}

        {/* Sommaire : liens vers chaque rubrique */}
        {toc.length > 1 && (
          <nav aria-label={t("Journey.jumpTo")} className="mb-14">
            <ul className="flex flex-wrap gap-2">
              {toc.map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="inline-block rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                  >
                    {t(`Journey.kinds.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="space-y-16">
          {groups.map((group) => (
            <section key={group.kind} id={group.kind} aria-labelledby={`${group.kind}-title`} className="scroll-mt-24">
              <h2 id={`${group.kind}-title`} className="mb-8 text-2xl font-bold">
                {t(`Journey.kinds.${group.kind}`)}
              </h2>
              <Timeline entries={group.items} locale={locale} />
            </section>
          ))}

          {languages.length > 0 && (
            <section id="languages" aria-labelledby="languages-title" className="scroll-mt-24">
              <h2 id="languages-title" className="mb-8 text-2xl font-bold">
                {t("Journey.kinds.languages")}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {languages.map((lang) => (
                  <li key={lang._key} className="reveal rounded-xl border border-border p-4">
                    <p className="font-semibold">{lang.name}</p>
                    {lang.level && <p className="text-sm text-muted">{lang.level}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {interests.length > 0 && (
            <section id="interests" aria-labelledby="interests-title" className="scroll-mt-24">
              <h2 id="interests-title" className="mb-8 text-2xl font-bold">
                {t("Journey.kinds.interests")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest}>
                    <Badge tone="accent" className="px-4 py-2 text-sm">
                      {interest}
                    </Badge>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}
