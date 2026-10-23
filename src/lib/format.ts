import type { Locale } from "@/i18n/routing";

const intlLocale: Record<Locale, string> = { fr: "fr-FR", en: "en-US" };

// Les dates Sanity de type "date" sont au format AAAA-MM-JJ, sans heure.
// On les lit en UTC pour éviter tout décalage d'un jour selon le fuseau.
function toDate(value: string) {
  return new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
}

/** « 12 mars 2026 » / « March 12, 2026 » */
export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(value));
}

/** « sept. 2024 » / « Sep 2024 » */
export function formatMonthYear(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(toDate(value));
}

/** « sept. 2020 – oct. 2024 », « sept. 2024 – Aujourd'hui » ou une seule date. */
export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
  { single = false }: { single?: boolean } = {},
) {
  const from = formatMonthYear(start, locale);
  if (single) return from; // ex. certification : date d'obtention seulement
  return `${from} – ${end ? formatMonthYear(end, locale) : presentLabel}`;
}
