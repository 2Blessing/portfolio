import type { Metadata } from "next";
import { BlogListing, blogListingMetadata } from "@/components/blog/BlogListing";

export function generateMetadata(): Promise<Metadata> {
  return blogListingMetadata(1);
}

/** /blog : première page de tous les articles. */
export default function BlogPage() {
  return <BlogListing page={1} />;
}
