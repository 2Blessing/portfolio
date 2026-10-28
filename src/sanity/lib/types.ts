import type { PortableTextBlock } from "next-sanity";

/**
 * Types TypeScript des données renvoyées par nos requêtes GROQ (queries.ts).
 * Les champs traduits sont déjà « aplatis » : la requête renvoie directement
 * le texte dans la bonne langue (ou en français si la traduction manque).
 */

export type SanityImage = {
  _type?: "image" | "imageWithAlt";
  _key?: string;
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

/** Contenu riche (Portable Text) : paragraphes, titres, images, code… */
export type RichText = PortableTextBlock[];

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

export type SpokenLanguage = { _key: string; name: string; level: string | null };

export type Profile = {
  name: string;
  headline: string | null;
  tagline: string | null;
  photo: SanityImage | null;
  availability: string | null;
  location: string | null;
  bio: RichText | null;
  interests: string[] | null;
  languages: SpokenLanguage[] | null;
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

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mainImage: SanityImage | null;
  technologies: string[] | null;
  date: string | null;
  featured: boolean | null;
};

export type ProjectDetail = ProjectCard & {
  body: RichText | null;
  gallery: SanityImage[] | null;
  demoUrl: string | null;
  githubUrl: string | null;
};

export type JourneyKind = "education" | "experience" | "internship" | "certification";

export type JourneyEntry = {
  _id: string;
  kind: JourneyKind;
  title: string;
  organization: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  link: string | null;
};

export type SkillCategory = "languages" | "frameworks" | "tools" | "ai" | "soft";

export type Skill = {
  _id: string;
  name: string;
  category: SkillCategory;
  level: number;
};

export type Testimonial = {
  _id: string;
  author: string;
  role: string | null;
  quote: string;
  photo: SanityImage | null;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  mainImage: SanityImage | null;
  publishedAt: string;
  categories: { title: string; slug: string }[] | null;
  readingTime: number;
};

export type PostsPage = { posts: PostCard[]; total: number };

export type Category = {
  title: string;
  slug: string;
  description: string | null;
  count: number;
};

export type PostDetail = PostCard & {
  body: RichText | null;
  morePosts: PostCard[];
};
