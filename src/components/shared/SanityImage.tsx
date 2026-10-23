import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

/**
 * Affiche une image Sanity avec next/image (formats modernes, tailles adaptées).
 * `width` / `height` : taille de recadrage demandée à Sanity (respecte le point focal).
 * `sizes` : largeur d'affichage, pour que le navigateur choisisse la bonne taille.
 */
export function SanityImage({
  image,
  width,
  height,
  sizes,
  alt,
  className,
  preload,
}: {
  image: SanityImageType | null | undefined;
  width: number;
  height: number;
  sizes: string;
  alt?: string;
  className?: string;
  preload?: boolean;
}) {
  if (!image?.asset) return null;

  return (
    <Image
      src={urlFor(image).width(width).height(height).fit("crop").url()}
      alt={alt ?? image.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes}
      preload={preload}
      className={className}
    />
  );
}
