import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

// Pas d'indexation par Google + réglages d'affichage recommandés pour le Studio.
export { metadata, viewport } from "next-sanity/studio";

/** Sanity Studio : l'interface d'administration du contenu, sur /studio. */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
