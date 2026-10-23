import { defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";
import { slugify, slugValidation } from "../objects/slug";

/** Catégorie d'articles de blog (ex. « Intelligence artificielle », « Carrière »). */
export const category = defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom",
      type: "localeString",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "slug",
      title: "Adresse (slug)",
      type: "slug",
      options: { source: "title.fr", maxLength: 60, slugify: (input) => slugify(input, 60) },
      validation: slugValidation,
    }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
  ],
  preview: { select: { title: "title.fr", subtitle: "slug.current" } },
});
