import { defineQuery } from "next-sanity";

/**
 * Requêtes GROQ. Paramètre $locale = "fr" ou "en".
 * `coalesce(champ[$locale], champ.fr)` : texte dans la langue demandée,
 * sinon repli sur le français.
 */

// Profil (document unique, id "profile")
export const PROFILE_QUERY = defineQuery(`*[_id == "profile"][0]{
  name,
  "headline": coalesce(headline[$locale], headline.fr),
  "tagline": coalesce(tagline[$locale], tagline.fr),
  photo,
  "availability": coalesce(availability[$locale], availability.fr),
  "location": coalesce(location[$locale], location.fr),
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
