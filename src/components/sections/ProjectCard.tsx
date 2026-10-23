import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { SanityImage } from "@/components/shared/SanityImage";
import type { ProjectCard as ProjectCardType } from "@/sanity/lib/types";

/** Carte de projet : image, titre, description courte, technologies. Toute la carte est cliquable. */
export async function ProjectCard({ project }: { project: ProjectCardType }) {
  const t = await getTranslations("Projects");
  const techs = project.technologies ?? [];

  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent">
      <div className="aspect-video overflow-hidden bg-surface">
        <SanityImage
          image={project.mainImage}
          width={800}
          height={450}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        {project.featured && (
          <Badge tone="accent" className="mb-3 self-start">
            {t("featured")}
          </Badge>
        )}
        <h3 className="text-lg font-bold">
          {/* Le lien couvre toute la carte (after:absolute) */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        {project.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted">{project.excerpt}</p>}

        {techs.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={t("technologies")}>
            {techs.slice(0, 4).map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
            {techs.length > 4 && (
              <li>
                <Badge>+{techs.length - 4}</Badge>
              </li>
            )}
          </ul>
        )}
      </div>
    </article>
  );
}
