import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { SanityImage } from "@/components/shared/SanityImage";
import type { Locale } from "@/i18n/routing";
import { formatDate } from "@/lib/format";
import type { PostCard as PostCardType } from "@/sanity/lib/types";

/** Carte d'article : image, catégories, titre, résumé, date et temps de lecture. */
export async function PostCard({ post, locale }: { post: PostCardType; locale: Locale }) {
  const t = await getTranslations("Posts");

  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent">
      {post.mainImage?.asset && (
        <div className="aspect-[16/9] overflow-hidden bg-surface">
          <SanityImage
            image={post.mainImage}
            width={800}
            height={450}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {post.categories && post.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.categories.map((c) => (
              <Badge key={c.slug} tone="accent">
                {c.title}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="text-lg font-bold">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>}
        <p className="mt-auto pt-5 text-xs text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          <span aria-hidden="true"> · </span>
          {t("readingTime", { minutes: post.readingTime })}
        </p>
      </div>
    </article>
  );
}
