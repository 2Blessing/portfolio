import type { Metadata } from "next";
import { BlogListing, blogListingMetadata, countPages, parsePageParam } from "@/components/blog/BlogListing";
import { getCategories } from "@/sanity/lib/data";

/**
 * Pré-rend les pages 2, 3… de chaque catégorie.
 * Cette route doit fournir les deux valeurs (slug ET n) : la page parente ne les transmet pas.
 * Valeur bidon s'il n'y a rien à pré-rendre (→ 404).
 */
export async function generateStaticParams() {
  const categories = await getCategories("fr");
  const params = categories.flatMap((c) =>
    Array.from({ length: countPages(c.count) - 1 }, (_, i) => ({ slug: c.slug, n: String(i + 2) })),
  );
  return params.length > 0 ? params : [{ slug: "__aucune__", n: "1" }];
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/category/[slug]/page/[n]">): Promise<Metadata> {
  const { slug, n } = await params;
  return blogListingMetadata(Number(n) || 1, slug);
}

/** /blog/category/X/page/N : page N d'une catégorie. */
export default async function BlogCategoryPaginatedPage({
  params,
}: PageProps<"/[locale]/blog/category/[slug]/page/[n]">) {
  const { slug, n } = await params;
  return <BlogListing page={parsePageParam(n)} categorySlug={slug} />;
}
