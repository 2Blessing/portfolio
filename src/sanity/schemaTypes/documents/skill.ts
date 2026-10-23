import { defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

export const skillCategories = [
  { title: "Langages", value: "languages" },
  { title: "Frameworks", value: "frameworks" },
  { title: "Outils", value: "tools" },
  { title: "Intelligence artificielle", value: "ai" },
  { title: "Compétences transversales", value: "soft" },
];

/** Une compétence, rangée par catégorie, avec un niveau de 1 à 5. */
export const skill = defineType({
  name: "skill",
  title: "Compétence",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      description: "Ex. « TypeScript », « Travail en équipe »",
      type: "localeString",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: { list: skillCategories, layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Niveau (1 à 5)",
      description: "1 = notions · 3 = à l'aise · 5 = expert",
      type: "number",
      initialValue: 3,
      validation: (Rule) => Rule.required().integer().min(1).max(5),
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      description: "Les plus petits nombres s'affichent en premier dans leur catégorie.",
      type: "number",
      initialValue: 10,
    }),
  ],
  orderings: [
    { title: "Catégorie puis ordre", name: "catOrder", by: [{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name.fr", category: "category", level: "level" },
    prepare: ({ title, category, level }) => ({
      title,
      subtitle: `${skillCategories.find((c) => c.value === category)?.title ?? ""} · ${"●".repeat(level ?? 0)}${"○".repeat(5 - (level ?? 0))}`,
    }),
  },
});
