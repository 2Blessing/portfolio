import type { Metadata } from "next";
import { BlogListing, blogListingMetadata } from "@/components/blog/BlogListing";
import { getCategories } from "@/sanity/lib/data";

/** Pré-rend une page par catégorie (valeur bidon s'il n'y en a aucune → 404). */
export async function generateStaticParams() {
  const categories = await getCategories("fr");
  return categories.length > 0 ? categories.map((c) => ({ slug: c.slug })) : [{ slug: "__aucune__" }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return blogListingMetadata(1, slug);
}

/** /blog/category/X : articles d'une catégorie (page 1). */
export default async function BlogCategoryPage({ params }: PageProps<"/[locale]/blog/category/[slug]">) {
  const { slug } = await params;
  return <BlogListing page={1} categorySlug={slug} />;
}
