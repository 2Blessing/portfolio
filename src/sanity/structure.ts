import type { StructureResolver } from "sanity/structure";

/**
 * Organisation du menu de gauche du Studio.
 * Profil et Paramètres ouvrent directement leur document unique (id fixe).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Profil")
        .id("profile")
        .child(S.document().schemaType("profile").documentId("profile").title("Profil")),
      S.divider(),
      S.documentTypeListItem("project").title("Projets"),
      S.documentTypeListItem("journeyEntry").title("Parcours"),
      S.documentTypeListItem("skill").title("Compétences"),
      S.divider(),
      S.documentTypeListItem("post").title("Articles"),
      S.documentTypeListItem("category").title("Catégories"),
      S.divider(),
      S.documentTypeListItem("testimonial").title("Témoignages"),
      S.listItem()
        .title("Paramètres du site")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Paramètres du site"),
        ),
    ]);
