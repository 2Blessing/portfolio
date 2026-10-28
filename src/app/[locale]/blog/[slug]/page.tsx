import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FaArrowLeft } from "react-icons/fa6";
import { getCurrentLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichText } from "@/components/shared/RichText";
import { SanityImage } from "@/components/shared/SanityImage";
import { PostCard } from "@/components/sections/PostCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import { getPost, getPostSlugs } from "@/sanity/lib/data";
import { urlFor } from "@/sanity/lib/image";

// Valeur bidon utilisée seulement s'il n'y a encore aucun article (cacheComponents exige au moins une valeur).
const PLACEHOLDER = "__aucun-article__";

/** Pré-rend une page par article. Les articles publiés ensuite sont rendus à la première visite. */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.length > 0 ? slugs.map((slug) => ({ slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(await getCurrentLocale(), slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
      publishedTime: post.publishedAt,
      images: post.mainImage?.asset
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url(), width: 1200, height: 630 }]
        : undefined,
    },
  };
}

/** Page d'un article : catégories, titre, date, temps de lecture, image, contenu, partage, autres articles. */
export default async function PostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { slug } = await params;
  if (slug === PLACEHOLDER) notFound();

  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const post = await getPost(locale, slug);
  if (!post) notFound();

  const url = absoluteUrl(`/${locale}/blog/${post.slug}`);

  return (
    <>
      <article>
        <header className="border-b border-border bg-surface">
          <Container className="max-w-3xl py-12 sm:py-16">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent">
              <FaArrowLeft aria-hidden="true" className="h-3 w-3" /> {t("Blog.back")}
            </Link>

            {post.categories && post.categories.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {post.categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/blog/category/${c.slug}`}>
                      <Badge tone="accent" className="hover:underline">
                        {c.title}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
            {post.excerpt && <p className="mt-6 text-lg text-muted">{post.excerpt}</p>}

            <p className="mt-6 text-sm text-muted">
              {t("Blog.publishedOn")} <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              <span aria-hidden="true"> · </span>
              {t("Posts.readingTime", { minutes: post.readingTime })}
            </p>
          </Container>
        </header>

        <Container className="max-w-3xl py-12 sm:py-16">
          <SanityImage
            image={post.mainImage}
            width={1600}
            height={900}
            sizes="(min-width: 768px) 720px, 100vw"
            preload
            className="mb-12 w-full rounded-2xl border border-border object-cover"
          />

          <RichText value={post.body} />

          <div className="mt-14 border-t border-border pt-8">
            <ShareButtons url={url} title={post.title} />
          </div>
        </Container>
      </article>

      {post.morePosts.length > 0 && (
        <section aria-labelledby="more-posts" className="border-t border-border bg-surface py-16 sm:py-20">
          <Container>
            <SectionHeading
              id="more-posts"
              title={t("Blog.morePosts")}
              link={{ href: "/blog", label: t("Blog.back") }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.morePosts.map((p) => (
                <PostCard key={p._id} post={p} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
