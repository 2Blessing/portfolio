import { slugifyName } from "./utils";

/**
 * URL de téléchargement du CV : `?dl=nom.pdf` demande à Sanity de forcer
 * le téléchargement avec un nom de fichier propre (ex. CV-tchabi-odilon.pdf).
 */
export function cvDownloadUrl(fileUrl: string, ownerName: string) {
  return `${fileUrl}?dl=${encodeURIComponent(`CV-${slugifyName(ownerName)}.pdf`)}`;
}
