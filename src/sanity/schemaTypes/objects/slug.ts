import type { SlugRule, SlugValue } from "sanity";

/**
 * Transforme un titre en adresse propre : « Gestion de Pressing ! » → « gestion-de-pressing ».
 * (minuscules, sans accents, mots séparés par des tirets)
 */
export function slugify(input: string, maxLength = 96) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "") // retire les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength);
}

/**
 * Validation : obligatoire + uniquement minuscules, chiffres et tirets.
 * `reserved` : adresses interdites car déjà utilisées par le site (ex. "page" dans /blog/page/2).
 */
export const slugValidation =
  (reserved: string[] = []) =>
  (Rule: SlugRule) =>
    Rule.required().custom((value: SlugValue | undefined) => {
      const slug = value?.current ?? "";
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return "Uniquement des minuscules, des chiffres et des tirets (ex. « mon-projet »). Clique sur « Générer ».";
      }
      if (reserved.includes(slug)) {
        return `L'adresse « ${slug} » est réservée par le site. Choisis-en une autre.`;
      }
      return true;
    });
