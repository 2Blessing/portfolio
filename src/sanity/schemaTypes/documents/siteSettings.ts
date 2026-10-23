import { defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

/** Paramètres du site : un seul document (SEO, image de partage, options d'affichage). */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre du site",
      description: "Affiché dans l'onglet du navigateur et sur Google.",
      type: "localeString",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "description",
      title: "Description SEO",
      description: "Environ 150 caractères. Affichée sous le titre dans Google.",
      type: "localeText",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "ogImage",
      title: "Image de partage",
      description: "Affichée quand on partage le site (LinkedIn, WhatsApp…). Format conseillé : 1200 × 630 px.",
      type: "imageWithAlt",
    }),
    defineField({
      name: "showTestimonials",
      title: "Afficher les témoignages sur l'accueil",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: { prepare: () => ({ title: "Paramètres du site" }) },
});
