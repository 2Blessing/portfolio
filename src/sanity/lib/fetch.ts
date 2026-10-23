import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

/**
 * Récupère des données Sanity et les met en cache.
 *
 * - `tags` : types de documents utilisés par la requête (ex. ["project"]).
 *   Quand un document de ce type est publié, le webhook Sanity appelle
 *   /api/revalidate qui invalide ce tag → la page se met à jour (Phase 7).
 * - Filet de sécurité : le cache est de toute façon rafraîchi toutes les heures.
 * - En développement (`npm run dev`) : cache de quelques secondes, pour voir
 *   tout de suite ce qu'on publie dans le Studio (recharger la page 1 ou 2 fois).
 */
const isDev = process.env.NODE_ENV === "development";

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  "use cache";
  cacheLife(isDev ? "seconds" : "hours");
  cacheTag(...tags);
  return client.fetch<T>(query, params);
}
