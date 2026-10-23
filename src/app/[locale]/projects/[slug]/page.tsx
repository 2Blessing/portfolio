import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FaArrowLeft, FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import { getCurrentLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ExternalButtonLink } from "@/components/ui/ButtonLink";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/shared/SanityImage";
import { formatMonthYear } from "@/lib/format";
import { getProject, getProjectSlugs } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";

// Valeur bidon utilisée seulement s'il n'y a encore aucun projet dans Sanity
// (avec cacheComponents, il faut au moins une valeur au build).
const PLACEHOLDER = "__aucun-projet__";

/** Pré-rend une page par projet au moment du build. Les projets ajoutés ensuite sont rendus à la première visite. */
export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(await getCurrentLocale(), decodeURIComponent(slug));
  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt ?? undefined,
    openGraph: project.mainImage?.asset
      ? { images: [{ url: urlFor(project.mainImage).width(1200).height(630).url(), width: 1200, height: 630 }] }
      : undefined,
  };
}

/** Détail d'un projet : image, technologies, liens, description longue, galerie. */
export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();

  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const project = await getProject(locale, decodeURIComponent(slug));
  if (!project) notFound();

  const techs = project.technologies ?? [];
  const gallery = project.gallery?.filter((img) => img.asset) ?? [];

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
          >
            <FaArrowLeft aria-hidden="true" className="h-3 w-3" /> {t("Projects.back")}
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">{project.title}</h1>
          {project.date && (
            <p className="mt-3 text-sm text-muted">
              <time dateTime={project.date}>{formatMonthYear(project.date, locale)}</time>
            </p>
          )}
          {project.excerpt && <p className="mt-6 max-w-3xl text-lg text-muted">{project.excerpt}</p>}

          {techs.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("Projects.technologies")}>
              {techs.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          )}

          {(project.demoUrl || project.githubUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl && (
                <ExternalButtonLink href={project.demoUrl}>
                  {t("Projects.demo")} <FaArrowUpRightFromSquare aria-hidden="true" className="h-3 w-3" />
                  <span className="sr-only">{t("A11y.newTab")}</span>
                </ExternalButtonLink>
              )}
              {project.githubUrl && (
                <ExternalButtonLink href={project.githubUrl} variant="secondary">
                  <FaGithub aria-hidden="true" className="h-4 w-4" /> {t("Projects.github")}
                  <span className="sr-only">{t("A11y.newTab")}</span>
                </ExternalButtonLink>
              )}
            </div>
          )}
        </Container>
      </header>

      <Container className="max-w-4xl py-12 sm:py-16">
        <SanityImage
          image={project.mainImage}
          width={1600}
          height={900}
          sizes="(min-width: 896px) 832px, 100vw"
          preload
          className="w-full rounded-2xl border border-border object-cover shadow-lg"
        />

        <RichText value={project.body} className="mt-12" />

        {gallery.length > 0 && (
          <section aria-labelledby="gallery-title" className="mt-16">
            <h2 id="gallery-title" className="mb-6 text-2xl font-bold">
              {t("Projects.gallery")}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {gallery.map((image, i) => (
                <li key={image._key ?? i} className="reveal">
                  <SanityImage
                    image={image}
                    width={1000}
                    height={625}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="w-full rounded-xl border border-border object-cover"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </article>
  );
}
