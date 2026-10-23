import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { SocialPlatform } from "@/sanity/lib/types";

const icons: Record<SocialPlatform, IconType> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  x: FaXTwitter,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  other: FaLink,
};

export const platformLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  x: "X",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
  other: "Lien",
};

/** Logo d'un réseau social (décoratif : le lien porte le nom en aria-label). */
export function SocialIcon({ platform, className }: { platform: SocialPlatform; className?: string }) {
  const Icon = icons[platform] ?? FaLink;
  return <Icon className={className} aria-hidden="true" />;
}
