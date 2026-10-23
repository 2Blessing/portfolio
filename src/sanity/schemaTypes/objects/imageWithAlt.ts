import { defineField, defineType } from "sanity";

/** Image avec texte alternatif obligatoire (accessibilité + SEO). */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texte alternatif",
      description: "Décrit l'image en une phrase (ex. « Capture de l'écran d'accueil de l'application »).",
      type: "string",
      validation: (Rule) =>
        Rule.custom((alt, ctx) => {
          // Obligatoire seulement si une image a été choisie.
          const hasImage = Boolean((ctx.parent as { asset?: unknown } | undefined)?.asset);
          return !hasImage || (alt && alt.trim() !== "") || "Le texte alternatif est obligatoire.";
        }),
    }),
  ],
});
