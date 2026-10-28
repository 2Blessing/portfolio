import type { Metadata } from "next";
import { BlogListing, blogListingMetadata, countPages, parsePageParam } from "@/components/blog/BlogListing";
import { getPostsPage } from "@/sanity/lib/data";

/** Pré-rend les pages 2, 3… de la liste. "1" sert de valeur bidon s'il n'y a qu'une page (→ 404). */
export async function generateStaticParams() {
  const { total } = await getPostsPage("fr", 1);
  const totalPages = countPages(total);
  if (totalPages < 2) return [{ n: "1" }];
  return Array.from({ length: totalPages - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/page/[n]">): Promise<Metadata> {
  const { n } = await params;
  return blogListingMetadata(Number(n) || 1);
}

/** /blog/page/N : page N de tous les articles. */
export default async function BlogPaginatedPage({ params }: PageProps<"/[locale]/blog/page/[n]">) {
  const { n } = await params;
  return <BlogListing page={parsePageParam(n)} />;
}
