import { defineRouting } from "next-intl/routing";

// Langues du site : français par défaut, anglais en second.
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Toujours afficher la langue dans l'URL : /fr/... et /en/...
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
