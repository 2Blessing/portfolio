import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Redirige "/" vers "/fr" (ou "/en" selon le navigateur) et gère la langue.
export default createMiddleware(routing);

export const config = {
  // Ignore : API, Studio Sanity, fichiers internes Next/Vercel et fichiers avec extension.
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};
