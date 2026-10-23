import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "./fetch";
import {
  JOURNEY_QUERY,
  LATEST_POSTS_QUERY,
  LATEST_PROJECTS_QUERY,
  PROFILE_QUERY,
  PROJECT_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
  SETTINGS_QUERY,
  SKILLS_QUERY,
  TESTIMONIALS_QUERY,
} from "./queries";
import type {
  JourneyEntry,
  PostCard,
  Profile,
  ProjectCard,
  ProjectDetail,
  SiteSettings,
  Skill,
  Testimonial,
} from "./types";

/**
 * Fonctions de lecture utilisées par les pages.
 * `tags` = types de documents lus : ils servent à rafraîchir le cache
 * quand un document de ce type est publié (webhook, Phase 7).
 */

export const getProfile = (locale: Locale) =>
  sanityFetch<Profile | null>({ query: PROFILE_QUERY, params: { locale }, tags: ["profile"] });

export const getSiteSettings = (locale: Locale) =>
  sanityFetch<SiteSettings | null>({ query: SETTINGS_QUERY, params: { locale }, tags: ["siteSettings"] });

export const getProjects = (locale: Locale) =>
  sanityFetch<ProjectCard[]>({ query: PROJECTS_QUERY, params: { locale }, tags: ["project"] });

export const getLatestProjects = (locale: Locale) =>
  sanityFetch<ProjectCard[]>({ query: LATEST_PROJECTS_QUERY, params: { locale }, tags: ["project"] });

export const getProject = (locale: Locale, slug: string) =>
  sanityFetch<ProjectDetail | null>({ query: PROJECT_QUERY, params: { locale, slug }, tags: ["project"] });

export const getProjectSlugs = () =>
  sanityFetch<string[]>({ query: PROJECT_SLUGS_QUERY, tags: ["project"] });

export const getJourney = (locale: Locale) =>
  sanityFetch<JourneyEntry[]>({ query: JOURNEY_QUERY, params: { locale }, tags: ["journeyEntry"] });

export const getSkills = (locale: Locale) =>
  sanityFetch<Skill[]>({ query: SKILLS_QUERY, params: { locale }, tags: ["skill"] });

export const getTestimonials = (locale: Locale) =>
  sanityFetch<Testimonial[]>({ query: TESTIMONIALS_QUERY, params: { locale }, tags: ["testimonial"] });

// Les articles affichent aussi leurs catégories → deux tags.
export const getLatestPosts = (locale: Locale) =>
  sanityFetch<PostCard[]>({ query: LATEST_POSTS_QUERY, params: { locale }, tags: ["post", "category"] });
