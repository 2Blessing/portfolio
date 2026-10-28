import { defineArrayMember, defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";
import { slugify, slugValidation } from "../objects/slug";

/** Article de blog. Le temps de lecture est calculé automatiquement sur le site. */
export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "slug",
      title: "Adresse de l'article (slug)",
      description: "Cliquer sur « Générer » pour la créer à partir du titre.",
      type: "slug",
      options: { source: "title.fr", maxLength: 96, slugify: (input) => slugify(input, 96) },
      validation: slugValidation(["page", "category"]),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Catégories",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
    }),
    defineField({
      name: "excerpt",
      title: "Résumé",
      description: "2 à 3 phrases affichées dans la liste et lors du partage.",
      type: "localeText",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({ name: "mainImage", title: "Image de couverture", type: "imageWithAlt" }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "localeBlockContent",
      validation: (Rule) => Rule.custom(frRequired),
    }),
  ],
  orderings: [
    { title: "Plus récent d'abord", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.fr", date: "publishedAt", media: "mainImage" },
    prepare: ({ title, date, media }) => ({
      title,
      subtitle: date ? new Date(date).toLocaleDateString("fr-FR") : "Non daté",
      media,
    }),
  },
});
