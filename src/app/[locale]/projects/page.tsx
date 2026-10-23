import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { getProjects } from "@/sanity/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Nav.projects"), description: t("Projects.intro") };
}

/** Liste de tous les projets (mis en avant d'abord, puis du plus récent au plus ancien). */
export default async function ProjectsPage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const projects = await getProjects(locale);

  return (
    <>
      <PageHeader title={t("Nav.projects")} intro={t("Projects.intro")} />
      <Container className="py-16 sm:py-20">
        {projects.length === 0 ? (
          <p className="text-muted">{t("Common.empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
