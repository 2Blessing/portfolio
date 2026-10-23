import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Construit l'URL d'une image Sanity (redimensionnée par le CDN de Sanity).
 * Ex. urlFor(photo).width(800).height(800).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
