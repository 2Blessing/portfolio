import { defineArrayMember, defineField, defineType } from "sanity";
import { frRequired } from "../objects/locale";

// Réseaux proposés dans la liste (l'icône du site dépend de cette valeur).
export const socialPlatforms = [
  { title: "LinkedIn", value: "linkedin" },
  { title: "GitHub", value: "github" },
  { title: "WhatsApp", value: "whatsapp" },
  { title: "Instagram", value: "instagram" },
  { title: "X (Twitter)", value: "x" },
  { title: "Facebook", value: "facebook" },
  { title: "YouTube", value: "youtube" },
  { title: "TikTok", value: "tiktok" },
  { title: "Autre", value: "other" },
];

/** Profil : un seul document (nom, photo, bio, CV, contacts, réseaux). */
export const profile = defineType({
  name: "profile",
  title: "Profil",
  type: "document",
  groups: [
    { name: "identity", title: "Identité", default: true },
    { name: "about", title: "À propos" },
    { name: "contact", title: "Contact & réseaux" },
    { name: "cv", title: "CV" },
  ],
  fields: [
    // --- Identité ---
    defineField({
      name: "name",
      title: "Nom complet",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Titre",
      description: "Ex. « Développeur Full Stack »",
      type: "localeString",
      group: "identity",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "tagline",
      title: "Accroche (page d'accueil)",
      description: "Une ou deux phrases qui te présentent.",
      type: "localeText",
      group: "identity",
      validation: (Rule) => Rule.custom(frRequired),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "imageWithAlt",
      group: "identity",
    }),
    defineField({
      name: "availability",
      title: "Disponibilité",
      description: "Ex. « Disponible pour un stage dès janvier 2027 ». Laisser vide pour masquer.",
      type: "localeString",
      group: "identity",
    }),
    defineField({
      name: "location",
      title: "Localisation",
      description: "Ex. « Cotonou, Bénin »",
      type: "localeString",
      group: "identity",
    }),

    // --- À propos ---
    defineField({
      name: "bio",
      title: "Présentation détaillée",
      type: "localeBlockContent",
      group: "about",
    }),
    defineField({
      name: "interests",
      title: "Centres d'intérêt",
      type: "array",
      group: "about",
      of: [defineArrayMember({ type: "localeString" })],
    }),
    defineField({
      name: "languages",
      title: "Langues parlées",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "object",
          name: "spokenLanguage",
          title: "Langue",
          fields: [
            defineField({ name: "name", title: "Langue", type: "localeString", validation: (Rule) => Rule.custom(frRequired) }),
            defineField({ name: "level", title: "Niveau", description: "Ex. « Langue maternelle », « Courant », « B2 »", type: "localeString" }),
          ],
          preview: { select: { title: "name.fr", subtitle: "level.fr" } },
        }),
      ],
    }),

    // --- Contact & réseaux ---
    defineField({
      name: "email",
      title: "Adresse e-mail publique",
      type: "string",
      group: "contact",
      validation: (Rule) => Rule.email().error("Adresse e-mail invalide."),
    }),
    defineField({
      name: "whatsappNumber",
      title: "Numéro WhatsApp",
      description: "Format international, chiffres uniquement, sans + ni espaces. Ex. 22997000000",
      type: "string",
      group: "contact",
      validation: (Rule) =>
        Rule.regex(/^\d{8,15}$/, { name: "chiffres" }).error(
          "Uniquement des chiffres (8 à 15), indicatif pays compris, sans + ni espaces.",
        ),
    }),
    defineField({
      name: "whatsappMessage",
      title: "Message WhatsApp pré-rempli",
      description: "Ex. « Bonjour Odilon, je vous contacte depuis votre portfolio. »",
      type: "localeString",
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Réseaux sociaux",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          title: "Lien",
          fields: [
            defineField({
              name: "platform",
              title: "Réseau",
              type: "string",
              options: { list: socialPlatforms },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "Adresse (URL)",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),

    // --- CV ---
    defineField({
      name: "cvFile",
      title: "CV (PDF, français)",
      type: "file",
      group: "cv",
      options: { accept: "application/pdf" },
    }),
    defineField({
      name: "cvFileEn",
      title: "CV (PDF, anglais)",
      description: "Facultatif. Si vide, le CV français est proposé.",
      type: "file",
      group: "cv",
      options: { accept: "application/pdf" },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "headline.fr", media: "photo" },
  },
});
