import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { ButtonLink, ExternalButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SanityImage } from "@/components/shared/SanityImage";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { PostCard } from "@/components/sections/PostCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { cvDownloadUrl } from "@/lib/cv";
import {
  getLatestPosts,
  getLatestProjects,
  getProfile,
  getSiteSettings,
  getTestimonials,
} from "@/sanity/lib/data";

/** Page d'accueil : présentation, derniers projets, derniers articles, témoignages. */
export default async function HomePage() {
  const locale = await getCurrentLocale();
  const t = await getTranslations("Home");
  const tMeta = await getTranslations("Meta");

  // Les requêtes partent en parallèle.
  const [profile, settings, projects, posts] = await Promise.all([
    getProfile(locale),
    getSiteSettings(locale),
    getLatestProjects(locale),
    getLatestPosts(locale),
  ]);
  // Témoignages : chargés seulement s'ils sont activés dans les Paramètres du site.
  const testimonials = settings?.showTestimonials ? await getTestimonials(locale) : [];

  // Textes par défaut tant que le Profil n'est pas rempli dans Sanity.
  const name = profile?.name ?? tMeta("siteName");
  const headline = profile?.headline ?? t("role");
  const tagline = profile?.tagline ?? t("pitch");

  return (
    <>
      {/* --- Présentation --- */}
      <section aria-labelledby="hero-title">
        <Container className="grid items-center gap-12 py-16 sm:py-24 md:grid-cols-[1fr_auto]">
          <div className="order-2 md:order-1">
            {profile?.availability && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm text-muted">
                <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                {profile.availability}
              </p>
            )}
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">{headline}</p>
            <h1 id="hero-title" className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              <span className="block text-2xl font-semibold text-muted sm:text-3xl">{t("greeting")}</span>
              {name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{tagline}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/projects">{t("ctaProjects")}</ButtonLink>
              {profile?.cvUrl && (
                <ExternalButtonLink
                  href={cvDownloadUrl(profile.cvUrl, name)}
                  variant="secondary"
                  newTab={false}
                  download
                >
                  {t("ctaCv")}
                </ExternalButtonLink>
              )}
              <ButtonLink href="/contact" variant="secondary">
                {t("ctaContact")}
              </ButtonLink>
            </div>

            <SocialLinks links={profile?.socialLinks ?? []} className="mt-8" />
          </div>

          {profile?.photo?.asset && (
            <div className="order-1 mx-auto md:order-2">
              <SanityImage
                image={profile.photo}
                alt={profile.photo.alt ?? name}
                width={640}
                height={640}
                sizes="(min-width: 640px) 288px, 224px"
                preload
                className="h-56 w-56 rounded-full border-4 border-surface object-cover shadow-xl sm:h-72 sm:w-72"
              />
            </div>
          )}
        </Container>
      </section>

      {/* --- Projets récents --- */}
      {projects.length > 0 && (
        <section aria-labelledby="latest-projects" className="border-t border-border bg-surface py-16 sm:py-24">
          <Container>
            <SectionHeading
              id="latest-projects"
              title={t("latestProjects")}
              intro={t("latestProjectsIntro")}
              link={{ href: "/projects", label: t("allProjects") }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* --- Derniers articles --- */}
      {posts.length > 0 && (
        <section aria-labelledby="latest-posts" className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              id="latest-posts"
              title={t("latestPosts")}
              intro={t("latestPostsIntro")}
              link={{ href: "/blog", label: t("allPosts") }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* --- Témoignages (activables dans Sanity > Paramètres du site) --- */}
      {testimonials.length > 0 && (
        <section aria-labelledby="testimonials" className="border-t border-border bg-surface py-16 sm:py-24">
          <Container>
            <SectionHeading id="testimonials" title={t("testimonials")} />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((item) => (
                <TestimonialCard key={item._id} testimonial={item} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
