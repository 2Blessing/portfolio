import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SkillList, groupSkills } from "@/components/sections/SkillList";
import { getSkills } from "@/sanity/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Nav.skills"), description: t("Skills.intro") };
}

/** Compétences regroupées par catégorie, avec un niveau visuel. */
export default async function SkillsPage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const groups = groupSkills(await getSkills(locale));

  return (
    <>
      <PageHeader title={t("Nav.skills")} intro={t("Skills.intro")} />

      <Container className="py-16 sm:py-20">
        {groups.length === 0 ? (
          <p className="text-muted">{t("Common.empty")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <section
                key={group.category}
                aria-labelledby={`${group.category}-title`}
                className="reveal rounded-2xl border border-border bg-background p-6"
              >
                <h2 id={`${group.category}-title`} className="mb-6 text-lg font-bold">
                  {t(`Skills.categories.${group.category}`)}
                </h2>
                <SkillList skills={group.items} />
              </section>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
