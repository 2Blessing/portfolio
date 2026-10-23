import { defineField, defineType } from "sanity";

/**
 * Champs traduits : chaque texte a une version FR (obligatoire) et EN (facultative).
 * Sur le site, si la version EN est vide, la version FR s'affiche.
 */

// Petit texte sur une ligne (titres, libellés)
export const localeString = defineType({
  name: "localeString",
  title: "Texte (FR / EN)",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "fr", title: "Français", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

// Texte de plusieurs lignes, sans mise en forme (résumés, descriptions courtes)
export const localeText = defineType({
  name: "localeText",
  title: "Texte long (FR / EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "text", rows: 4 }),
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
  ],
});

// Texte riche (titres, listes, liens, images, code) : articles, détail des projets, bio
export const localeBlockContent = defineType({
  name: "localeBlockContent",
  title: "Contenu riche (FR / EN)",
  type: "object",
  fields: [
    defineField({ name: "fr", title: "Français", type: "blockContent" }),
    defineField({ name: "en", title: "English", type: "blockContent" }),
  ],
});

/**
 * Vérifie que la version française est remplie.
 * Utilisation : validation: (Rule) => Rule.custom(frRequired)
 */
export function frRequired(value: { fr?: unknown } | undefined): true | string {
  const fr = value?.fr;
  const filled = Array.isArray(fr) ? fr.length > 0 : typeof fr === "string" && fr.trim() !== "";
  return filled || "La version française est obligatoire.";
}
