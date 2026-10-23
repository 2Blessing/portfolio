import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "./fetch";
import { PROFILE_QUERY, SETTINGS_QUERY } from "./queries";
import type { Profile, SiteSettings } from "./types";

/**
 * Fonctions de lecture utilisées par les pages.
 * Chacune indique ses tags de cache (= types de documents concernés).
 */

export function getProfile(locale: Locale) {
  return sanityFetch<Profile | null>({ query: PROFILE_QUERY, params: { locale }, tags: ["profile"] });
}

export function getSiteSettings(locale: Locale) {
  return sanityFetch<SiteSettings | null>({
    query: SETTINGS_QUERY,
    params: { locale },
    tags: ["siteSettings"],
  });
}
