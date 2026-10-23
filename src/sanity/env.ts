// Variables d'environnement Sanity (définies dans .env.local, voir .env.example).
// Elles commencent par NEXT_PUBLIC_ car le Studio tourne aussi dans le navigateur.
// Ce ne sont pas des secrets : l'identifiant de projet est public.

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Variable manquante : NEXT_PUBLIC_SANITY_DATASET (voir .env.example)",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Variable manquante : NEXT_PUBLIC_SANITY_PROJECT_ID (voir .env.example)",
);

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (!value) throw new Error(errorMessage);
  return value;
}
