import { Link } from "@/i18n/navigation";

/** Titre de section (h2) avec sous-titre et lien « voir tout » facultatifs. */
export function SectionHeading({
  id,
  title,
  intro,
  link,
}: {
  id?: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {intro && <p className="mt-2 max-w-2xl text-muted">{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="text-sm font-semibold text-accent hover:underline">
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
