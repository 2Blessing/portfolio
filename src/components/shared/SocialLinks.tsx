import type { SocialLink } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";
import { SocialIcon, platformLabels } from "./SocialIcon";

/** Rangée d'icônes de réseaux sociaux (données du Profil Sanity). */
export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link._key}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platformLabels[link.platform]}
            title={platformLabels[link.platform]}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <SocialIcon platform={link.platform} className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
