/**
 * Types TypeScript des données renvoyées par nos requêtes GROQ (queries.ts).
 * Les champs traduits sont déjà « aplatis » : la requête renvoie directement
 * le texte dans la bonne langue (ou en français si la traduction manque).
 */

export type SanityImage = {
  _type?: "image" | "imageWithAlt";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type SocialPlatform =
  | "linkedin"
  | "github"
  | "whatsapp"
  | "instagram"
  | "x"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "other";

export type SocialLink = { _key: string; platform: SocialPlatform; url: string };

export type Profile = {
  name: string;
  headline: string | null;
  tagline: string | null;
  photo: SanityImage | null;
  availability: string | null;
  location: string | null;
  email: string | null;
  whatsappNumber: string | null;
  whatsappMessage: string | null;
  socialLinks: SocialLink[] | null;
  cvUrl: string | null;
};

export type SiteSettings = {
  title: string | null;
  description: string | null;
  ogImage: SanityImage | null;
  showTestimonials: boolean | null;
};
