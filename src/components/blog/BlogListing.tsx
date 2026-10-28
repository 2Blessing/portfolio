import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentLocale } from "@/i18n/locale";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PostCard } from "@/components/sections/PostCard";
import { CategoryFilter } from "./CategoryFilter";
import { Pagination } from "./Pagination";
import { POSTS_PER_PAGE, getCategories, getPostsPage } from "@/sanity/lib/data";

/**
 * Transforme le paramètre d'URL « page/N » en nombre.
 * Seules les pages 2 et plus existent sous cette forme (la page 1 est /blog) : sinon 404.
 */
export function parsePageParam(value: string) {
  const page = Number(value);
  if (!Number.isInteger(page) || page < 2) notFound();
  return page;
}

/** Nombre de pages pour un total d'articles (au moins 1). */
export function countPages(total: number) {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

/** Titre et description d'une page de liste (pour les balises SEO). */
export async function blogListingMetadata(page: number, categorySlug?: string): Promise<Metadata> {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const category = categorySlug ? (await getCategories(locale)).find((c) => c.slug === categorySlug) : null;

  const base = category ? t("Blog.categoryTitle", { category: category.title }) : t("Nav.blog");
  return {
    title: page > 1 ? `${base} · ${t("Pagination.page", { page })}` : base,
    description: category?.description ?? t("Blog.intro"),
  };
}

/**
 * Page de liste du blog : en-tête, filtre par catégorie, cartes d'articles, pagination.
 * Utilisée par /blog, /blog/page/N, /blog/category/X et /blog/category/X/page/N.
 */
export async function BlogListing({ page, categorySlug }: { page: number; categorySlug?: string }) {
  const locale = await getCurrentLocale();
  const t = await getTranslations();
  const [{ posts, total }, categories] = await Promise.all([
    getPostsPage(locale, page, categorySlug ?? ""),
    getCategories(locale),
  ]);

  // Catégorie inconnue (ou sans article) → 404
  const category = categorySlug ? categories.find((c) => c.slug === categorySlug) : null;
  if (categorySlug && !category) notFound();

  // Numéro de page trop grand → 404
  const totalPages = countPages(total);
  if (page > totalPages) notFound();

  const basePath = category ? `/blog/category/${category.slug}` : "/blog";

  return (
    <>
      <PageHeader
        title={category ? t("Blog.categoryTitle", { category: category.title }) : t("Nav.blog")}
        intro={category?.description ?? t("Blog.intro")}
      />

      <Container className="py-12 sm:py-16">
        <CategoryFilter categories={categories} active={category?.slug ?? null} />

        {posts.length === 0 ? (
          <p className="text-muted">{t("Blog.empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} locale={locale} />
            ))}
          </div>
        )}

        <Pagination basePath={basePath} page={page} totalPages={totalPages} />
      </Container>
    </>
  );
}
