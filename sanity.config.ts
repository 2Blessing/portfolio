"use client";

/**
 * Configuration du Sanity Studio, intégré au site sur /studio.
 * Accès protégé : il faut se connecter avec un compte membre du projet Sanity.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "portfolio",
  title: "Portfolio · TCHABI Odilon",
  basePath: "/studio",
  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    codeInput(), // blocs de code dans les articles
    frFRLocale(), // interface du Studio en français
    visionTool({ defaultApiVersion: apiVersion }), // onglet pour tester des requêtes GROQ
  ],

  schema: {
    types: schemaTypes,
    // Les documents uniques n'apparaissent pas dans le bouton « Créer ».
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Documents uniques : pas de suppression, duplication ni dépublication.
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
