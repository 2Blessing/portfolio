import { PortableText, type PortableTextComponents } from "next-sanity";
import type { RichText as RichTextValue, SanityImage as SanityImageType } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import { SanityImage } from "./SanityImage";

type CodeBlock = { code?: string; language?: string; filename?: string };

/** Comment afficher chaque élément du contenu riche Sanity. */
const components: PortableTextComponents = {
  types: {
    // Image insérée dans le texte
    image: ({ value }: { value: SanityImageType & { caption?: string } }) => (
      <figure>
        <SanityImage
          image={value}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 720px, 100vw"
          className="w-full rounded-xl"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    // Bloc de code (plugin @sanity/code-input)
    code: ({ value }: { value: CodeBlock }) => (
      <figure className="not-prose my-8 overflow-hidden rounded-xl border border-border">
        {(value.filename || value.language) && (
          <figcaption className="flex justify-between border-b border-white/10 bg-[#0b1220] px-4 py-2 font-mono text-xs text-slate-400">
            <span>{value.filename}</span>
            <span>{value.language}</span>
          </figcaption>
        )}
        <pre className="overflow-x-auto bg-[#0b1220] p-4 text-sm leading-relaxed text-slate-200">
          <code>{value.code}</code>
        </pre>
      </figure>
    ),
  },
  marks: {
    // Liens : ceux qui sortent du site s'ouvrent dans un nouvel onglet
    link: ({ value, children }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

/** Affiche un contenu riche Sanity (Portable Text) avec la mise en forme « prose ». */
export function RichText({ value, className }: { value: RichTextValue | null; className?: string }) {
  if (!value || value.length === 0) return null;
  return (
    <div className={cn("prose prose-lg max-w-none prose-headings:font-heading prose-a:font-medium", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
