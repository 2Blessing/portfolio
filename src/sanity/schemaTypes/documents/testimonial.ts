import { defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

/** Témoignage (professeur, client, collègue). Affichage activable dans les Paramètres du site. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({ name: "author", title: "Nom de la personne", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "role",
      title: "Fonction",
      description: "Ex. « Enseignant à IRGIB Africa », « Client »",
      type: "localeString",
    }),
    defineField({
      name: "quote",
      title: "Témoignage",
      type: "localeText",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({ name: "photo", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "order", title: "Ordre d'affichage", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "author", subtitle: "role.fr", media: "photo" } },
});
