import { hasLocale } from "next-intl";
import { locale as rootLocale } from "next/root-params";
import { routing, type Locale } from "./routing";

/** Langue de la page en cours, côté serveur ("fr" ou "en"). */
export async function getCurrentLocale(): Promise<Locale> {
  const value = await rootLocale();
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
