import type { SchemaTypeDefinition } from "sanity";
import { localeString, localeText, localeBlockContent } from "./objects/locale";
import { blockContent } from "./objects/blockContent";
import { imageWithAlt } from "./objects/imageWithAlt";
import { profile } from "./documents/profile";
import { siteSettings } from "./documents/siteSettings";
import { journeyEntry } from "./documents/journeyEntry";
import { skill } from "./documents/skill";
import { project } from "./documents/project";
import { category } from "./documents/category";
import { post } from "./documents/post";
import { testimonial } from "./documents/testimonial";

/** Tous les types de contenu du Studio. */
export const schemaTypes: SchemaTypeDefinition[] = [
  // Briques réutilisables
  localeString,
  localeText,
  localeBlockContent,
  blockContent,
  imageWithAlt,
  // Documents
  profile,
  siteSettings,
  journeyEntry,
  skill,
  project,
  post,
  category,
  testimonial,
];

/** Documents uniques : un seul exemplaire, impossible à supprimer ou dupliquer. */
export const singletonTypes = new Set(["profile", "siteSettings"]);
