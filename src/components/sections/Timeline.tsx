import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatPeriod } from "@/lib/format";
import type { JourneyEntry } from "@/sanity/lib/types";

/**
 * Frise chronologique verticale : une ligne à gauche, un point par entrée.
 * `compact` : version plus serrée pour la page CV.
 */
export async function Timeline({
  entries,
  locale,
  compact = false,
}: {
  entries: JourneyEntry[];
  locale: Locale;
  compact?: boolean;
}) {
  const t = await getTranslations();

  return (
    <ol className="relative ml-2 border-l-2 border-border">
      {entries.map((entry) => (
        <li key={entry._id} className={compact ? "relative pb-6 pl-6 last:pb-0" : "reveal relative pb-10 pl-8 last:pb-0"}>
          {/* Point sur la ligne */}
          <span
            className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-background bg-accent"
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-accent">
            {formatPeriod(entry.startDate, entry.endDate, locale, t("Common.present"), {
              // Une certification n'a pas de période, seulement une date d'obtention.
              single: entry.kind === "certification" && !entry.endDate,
            })}
          </p>
          <h3 className={compact ? "mt-1 font-bold" : "mt-1 text-lg font-bold"}>{entry.title}</h3>
          <p className="text-sm text-muted">
            {entry.organization}
            {entry.location && ` · ${entry.location}`}
          </p>
          {entry.description && (
            <p className={compact ? "mt-2 text-sm" : "mt-3 max-w-2xl leading-relaxed"}>{entry.description}</p>
          )}
          {entry.link && (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-accent hover:underline"
            >
              {t("Journey.verify")} <span aria-hidden="true">↗</span>
              <span className="sr-only"> {t("A11y.newTab")}</span>
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
