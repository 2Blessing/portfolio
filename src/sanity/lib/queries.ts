import { defineQuery } from "next-sanity";

/**
 * Requêtes GROQ. Paramètre $locale = "fr" ou "en".
 * `coalesce(champ[$locale], champ.fr)` : texte dans la langue demandée,
 * sinon repli sur le français.
 */

// --- Morceaux réutilisés ---

// Carte de projet (listes, accueil)
const projectCardFields = /* groq */ `
  _id,
  "title": coalesce(title[$locale], title.fr),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt.fr),
  mainImage,
  technologies,
  date,
  featured
`;

// Carte d'article. Temps de lecture ≈ nombre de caractères / 1000
// (≈ 200 mots/minute × 5 caractères/mot), minimum 1 minute.
const postCardFields = /* groq */ `
  _id,
  "title": coalesce(title[$locale], title.fr),
  "slug": slug.current,
  "excerpt": coalesce(excerpt[$locale], excerpt.fr),
  mainImage,
  publishedAt,
  "categories": categories[]->{ "title": coalesce(title[$locale], title.fr), "slug": slug.current },
  "readingTime": math::max([1, round(length(pt::text(coalesce(body[$locale], body.fr))) / 1000)])
`;

// --- Profil et paramètres ---

// Profil (document unique, id "profile")
export const PROFILE_QUERY = defineQuery(`*[_id == "profile"][0]{
  name,
  "headline": coalesce(headline[$locale], headline.fr),
  "tagline": coalesce(tagline[$locale], tagline.fr),
  photo,
  "availability": coalesce(availability[$locale], availability.fr),
  "location": coalesce(location[$locale], location.fr),
  "bio": coalesce(bio[$locale], bio.fr),
  "interests": interests[]{ "label": coalesce(@[$locale], @.fr) }.label,
  "languages": languages[]{
    _key,
    "name": coalesce(name[$locale], name.fr),
    "level": coalesce(level[$locale], level.fr)
  },
  email,
  whatsappNumber,
  "whatsappMessage": coalesce(whatsappMessage[$locale], whatsappMessage.fr),
  socialLinks[]{ _key, platform, url },
  "cvUrl": select(
    $locale == "en" && defined(cvFileEn.asset) => cvFileEn.asset->url,
    cvFile.asset->url
  )
}`);

// Paramètres du site (document unique, id "siteSettings")
export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  "title": coalesce(title[$locale], title.fr),
  "description": coalesce(description[$locale], description.fr),
  ogImage,
  showTestimonials
}`);

// --- Projets ---

// Tous les projets : mis en avant d'abord, puis du plus récent au plus ancien
export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(featured desc, date desc){ ${projectCardFields} }`);

// Les 3 projets de l'accueil
export const LATEST_PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]
  | order(featured desc, date desc)[0...3]{ ${projectCardFields} }`);

// Un projet complet (page de détail)
export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  ${projectCardFields},
  "body": coalesce(body[$locale], body.fr),
  gallery,
  demoUrl,
  githubUrl
}`);

// Adresses de tous les projets (pour pré-rendre les pages au build)
export const PROJECT_SLUGS_QUERY = defineQuery(
  `*[_type == "project" && defined(slug.current)].slug.current`,
);

// --- Parcours, compétences, témoignages ---

export const JOURNEY_QUERY = defineQuery(`*[_type == "journeyEntry"] | order(startDate desc){
  _id,
  kind,
  "title": coalesce(title[$locale], title.fr),
  organization,
  location,
  startDate,
  endDate,
  "description": coalesce(description[$locale], description.fr),
  link
}`);

export const SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(order asc, name.fr asc){
  _id,
  "name": coalesce(name[$locale], name.fr),
  category,
  level
}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial"] | order(order asc){
  _id,
  author,
  "role": coalesce(role[$locale], role.fr),
  "quote": coalesce(quote[$locale], quote.fr),
  photo
}`);

// --- Articles ---

// Les 3 derniers articles (accueil)
export const LATEST_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)[0...3]{ ${postCardFields} }`);
