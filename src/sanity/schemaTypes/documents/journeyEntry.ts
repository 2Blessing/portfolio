import { defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

export const journeyKinds = [
  { title: "Formation", value: "education" },
  { title: "Expérience", value: "experience" },
  { title: "Stage", value: "internship" },
  { title: "Certification", value: "certification" },
];

/** Une entrée du parcours (frise chronologique). */
export const journeyEntry = defineType({
  name: "journeyEntry",
  title: "Parcours",
  type: "document",
  fields: [
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      options: { list: journeyKinds, layout: "radio", direction: "horizontal" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Intitulé",
      description: "Ex. « Licence en Génie Logiciel », « Stagiaire développeur web »",
      type: "localeString",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "organization",
      title: "Structure",
      description: "École, entreprise ou organisme. Ex. « IRGIB Africa »",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "location", title: "Lieu", type: "string" }),
    defineField({
      name: "startDate",
      title: "Date de début",
      type: "date",
      options: { dateFormat: "MM/YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Date de fin",
      description: "Laisser vide si c'est en cours. Pour une certification : date d'obtention en début, fin vide.",
      type: "date",
      options: { dateFormat: "MM/YYYY" },
      validation: (Rule) =>
        Rule.custom((end, ctx) => {
          const start = (ctx.document as { startDate?: string } | undefined)?.startDate;
          return !end || !start || end >= start || "La date de fin doit être après la date de début.";
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "link",
      title: "Lien (facultatif)",
      description: "Ex. lien de vérification d'une certification.",
      type: "url",
    }),
  ],
  orderings: [
    { title: "Plus récent d'abord", name: "startDesc", by: [{ field: "startDate", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title.fr", org: "organization", kind: "kind", start: "startDate" },
    prepare: ({ title, org, kind, start }) => ({
      title,
      subtitle: [journeyKinds.find((k) => k.value === kind)?.title, org, start?.slice(0, 4)]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
