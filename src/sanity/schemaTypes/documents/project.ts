import { defineArrayMember, defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

/** Un projet du portfolio, avec sa page de détail. */
export const project = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  groups: [
    { name: "main", title: "Essentiel", default: true },
    { name: "details", title: "Détail" },
    { name: "links", title: "Liens" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "localeString",
      group: "main",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "slug",
      title: "Adresse de la page (slug)",
      description: "Cliquer sur « Générer » pour la créer à partir du titre.",
      type: "slug",
      group: "main",
      options: { source: "title.fr", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Description courte",
      description: "1 à 2 phrases, affichées sur les cartes.",
      type: "localeText",
      group: "main",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "imageWithAlt",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      description: "Taper puis Entrée. Ex. Next.js, Python, PostgreSQL",
      type: "array",
      group: "main",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "date",
      title: "Date du projet",
      type: "date",
      group: "main",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant",
      description: "Les projets mis en avant passent en premier.",
      type: "boolean",
      group: "main",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Description longue",
      type: "localeBlockContent",
      group: "details",
    }),
    defineField({
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      group: "details",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: { layout: "grid" },
    }),
    defineField({ name: "demoUrl", title: "Lien de démo", type: "url", group: "links" }),
    defineField({ name: "githubUrl", title: "Lien GitHub", type: "url", group: "links" }),
  ],
  orderings: [{ title: "Plus récent d'abord", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: { select: { title: "title.fr", subtitle: "date", media: "mainImage" } },
});
