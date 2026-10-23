import type { SlugRule, SlugValue } from "sanity";

/**
 * Transforme un titre en adresse propre : « Gestion de Pressing ! » → « gestion-de-pressing ».
 * (minuscules, sans accents, mots séparés par des tirets)
 */
export function slugify(input: string, maxLength = 96) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLength);
}

/** Validation : obligatoire + uniquement minuscules, chiffres et tirets. */
export const slugValidation = (Rule: SlugRule) =>
  Rule.required().custom((value: SlugValue | undefined) => {
    const slug = value?.current ?? "";
    return (
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      "Uniquement des minuscules, des chiffres et des tirets (ex. « mon-projet »). Clique sur « Générer »."
    );
  });
