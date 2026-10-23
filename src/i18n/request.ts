import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "./routing";

// Lit la langue depuis l'URL (/fr ou /en) et charge les textes de l'interface.
// `next/root-params` permet de garder les pages statiques (pré-rendues).
export default getRequestConfig(async ({ locale: explicitLocale }) => {
  // `explicitLocale` est fourni quand on appelle getTranslations({ locale })
  // (ex. dans une Server Action, où root-params n'est pas disponible).
  const candidate = explicitLocale ?? (await rootLocale());
  const locale = hasLocale(routing.locales, candidate)
    ? candidate
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
