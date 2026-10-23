import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Client Sanity en lecture seule.
 * - useCdn: false → données toujours fraîches ; c'est le cache de Next.js
 *   (voir fetch.ts) qui évite de rappeler Sanity à chaque visite.
 * - perspective "published" → seuls les documents publiés sont visibles (pas les brouillons).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
