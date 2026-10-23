import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaDownload, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { ExternalButtonLink } from "@/components/ui/ButtonLink";
import { Timeline } from "@/components/sections/Timeline";
import { groupSkills } from "@/components/sections/SkillList";
import { cvDownloadUrl } from "@/lib/cv";
import { getJourney, getProfile, getSkills } from "@/sanity/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Nav.cv"), description: t("Cv.intro") };
}

/**
 * CV : version en ligne (construite à partir du Parcours, des Compétences et du Profil)
 * + aperçu et téléchargement du PDF téléversé dans Sanity.
 */
export default async function CvPage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const [profile, journey, skills] = await Promise.all([
    getProfile(locale),
    getJourney(locale),
    getSkills(locale),
  ]);

  const experience = journey.filter((e) => e.kind === "experience" || e.kind === "internship");
  const education = journey.filter((e) => e.kind === "education");
  const certifications = journey.filter((e) => e.kind === "certification");
  const skillGroups = groupSkills(skills);
  const languages = profile?.languages ?? [];
  const interests = profile?.interests ?? [];
  const name = profile?.name ?? t("Meta.siteName");

  return (
    <>
      <PageHeader title={t("Nav.cv")} intro={t("Cv.intro")} />

      <Container className="py-12 sm:py-16">
        {/* Boutons PDF */}
        <div className="mb-12 flex flex-wrap items-center gap-3">
          {profile?.cvUrl ? (
            <>
              <ExternalButtonLink href={cvDownloadUrl(profile.cvUrl, name)} newTab={false} download>
                <FaDownload aria-hidden="true" className="h-4 w-4" /> {t("Cv.download")}
              </ExternalButtonLink>
              <ExternalButtonLink href={profile.cvUrl} variant="secondary">
                {t("Cv.open")} <FaArrowUpRightFromSquare aria-hidden="true" className="h-3 w-3" />
                <span className="sr-only">{t("A11y.newTab")}</span>
              </ExternalButtonLink>
            </>
          ) : (
            <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">{t("Cv.noPdf")}</p>
          )}
        </div>

        {/* --- Version en ligne --- */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-10">
          <header className="border-b border-border pb-6">
            <p className="font-heading text-2xl font-extrabold sm:text-3xl">{name}</p>
            {profile?.headline && <p className="mt-1 font-semibold text-accent">{profile.headline}</p>}
            <p className="mt-2 text-sm text-muted">
              {[profile?.location, profile?.email].filter(Boolean).join(" · ")}
            </p>
          </header>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              {experience.length > 0 && (
                <section aria-labelledby="cv-experience">
                  <h2 id="cv-experience" className="mb-6 text-xl font-bold">{t("Cv.experience")}</h2>
                  <Timeline entries={experience} locale={locale} compact />
                </section>
              )}
              {education.length > 0 && (
                <section aria-labelledby="cv-education">
                  <h2 id="cv-education" className="mb-6 text-xl font-bold">{t("Cv.education")}</h2>
                  <Timeline entries={education} locale={locale} compact />
                </section>
              )}
              {certifications.length > 0 && (
                <section aria-labelledby="cv-certifications">
                  <h2 id="cv-certifications" className="mb-6 text-xl font-bold">{t("Cv.certifications")}</h2>
                  <Timeline entries={certifications} locale={locale} compact />
                </section>
              )}
            </div>

            <aside className="space-y-8">
              {skillGroups.length > 0 && (
                <section aria-labelledby="cv-skills">
                  <h2 id="cv-skills" className="mb-4 text-xl font-bold">{t("Cv.skills")}</h2>
                  <div className="space-y-4">
                    {skillGroups.map((group) => (
                      <div key={group.category}>
                        <h3 className="text-sm font-semibold text-muted">
                          {t(`Skills.categories.${group.category}`)}
                        </h3>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {group.items.map((skill) => (
                            <li key={skill._id}>
                              <Badge>{skill.name}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {languages.length > 0 && (
                <section aria-labelledby="cv-languages">
                  <h2 id="cv-languages" className="mb-4 text-xl font-bold">{t("Cv.languages")}</h2>
                  <ul className="space-y-1 text-sm">
                    {languages.map((lang) => (
                      <li key={lang._key}>
                        <span className="font-medium">{lang.name}</span>
                        {lang.level && <span className="text-muted"> · {lang.level}</span>}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {interests.length > 0 && (
                <section aria-labelledby="cv-interests">
                  <h2 id="cv-interests" className="mb-4 text-xl font-bold">{t("Cv.interests")}</h2>
                  <p className="text-sm">{interests.join(" · ")}</p>
                </section>
              )}
            </aside>
          </div>
        </div>

        {/* --- Aperçu du PDF (grands écrans seulement : les téléphones affichent mal les PDF intégrés) --- */}
        {profile?.cvUrl && (
          <section aria-labelledby="cv-pdf" className="mt-16 hidden lg:block">
            <h2 id="cv-pdf" className="mb-6 text-xl font-bold">{t("Cv.pdfVersion")}</h2>
            <iframe
              src={`${profile.cvUrl}#view=FitH`}
              title={t("Cv.preview")}
              loading="lazy"
              className="h-[85vh] w-full rounded-2xl border border-border bg-surface"
            />
          </section>
        )}
      </Container>
    </>
  );
}
