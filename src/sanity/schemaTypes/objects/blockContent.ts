import { defineArrayMember, defineField, defineType } from "sanity";

/** Contenu riche utilisé pour les articles, les projets et la bio. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Contenu",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraphe", value: "normal" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Titre 4", value: "h4" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Liste à puces", value: "bullet" },
        { title: "Liste numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Lien",
            fields: [
              defineField({
                name: "href",
                title: "Adresse (URL)",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          description: "Décrit l'image pour les lecteurs d'écran et le référencement.",
          type: "string",
          validation: (Rule) => Rule.required().error("Le texte alternatif est obligatoire."),
        }),
        defineField({ name: "caption", title: "Légende", type: "string" }),
      ],
    }),
    defineArrayMember({
      type: "code",
      title: "Bloc de code",
      options: { withFilename: true },
    }),
  ],
});
