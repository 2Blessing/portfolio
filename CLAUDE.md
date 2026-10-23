@AGENTS.md

# Portfolio TCHABI Odilon : règles du projet

**Au début de chaque session, lire [PROGRESS.md](PROGRESS.md)** (état d'avancement, décisions, points ouverts) avant d'explorer le code. Le mettre à jour à la fin de chaque étape.

## Méthode de travail
- Avancer **phase par phase** (voir PROGRESS.md). Ne jamais commencer la phase suivante sans la validation du propriétaire.
- **Un commit Git par étape terminée**, message clair en français (`feat:`, `fix:`, `chore:`, `docs:`).
- Avant de committer : `npm run lint` et `npm run build` doivent passer.
- Le propriétaire a un niveau intermédiaire : code simple, lisible, commentaires utiles en français.
- Next.js 16 diffère des versions plus anciennes : consulter `node_modules/next/dist/docs/` en cas de doute.

## Stack
Next.js 16 (App Router, `cacheComponents` activé) · TypeScript strict · Tailwind CSS v4 · next-intl 4 · next-themes · Sanity (Studio sur `/studio`) · Formspree · Vercel (+ Analytics).

## Conventions importantes
- **Langues** : `fr` (par défaut) et `en`, routes `/fr/...` et `/en/...`.
  - Toutes les pages publiques sont sous `src/app/[locale]/`, qui est le **layout racine**.
  - Langue côté serveur via `next/root-params` (voir `src/i18n/request.ts`). Ne pas utiliser `headers()`.
  - Textes de l'interface : `src/i18n/messages/{fr,en}.json` (toujours modifier les deux).
  - Liens internes : importer `Link`, `usePathname`, etc. depuis `@/i18n/navigation`, **jamais** depuis `next/link`.
  - Contenu Sanity traduit avec des champs `{ fr, en }` ; si `en` est vide, on affiche `fr`.
- **cacheComponents** : tout composant client qui lit l'URL (`usePathname`, `useSearchParams`, `useParams`) doit être dans `<Suspense>`. Les valeurs changeantes (`new Date()`, etc.) passent par `"use cache"`.
- **Données Sanity** : toujours passer par `sanityFetch` (`src/sanity/lib/fetch.ts`) avec `tags` = types de documents lus. Requêtes dans `queries.ts` (traductions aplaties par `coalesce(x[$locale], x.fr)`), types dans `types.ts`, fonctions d'accès dans `data.ts`. Images : `urlFor()` + `next/image`.
- **Schémas Sanity** : libellés en français ; champs traduits via `localeString` / `localeText` / `localeBlockContent` ; images via `imageWithAlt` ; Profil et Paramètres sont des documents uniques (ids `profile` et `siteSettings`).
- **Animations** : ajouter la classe CSS `reveal` (défilement, 100 % CSS). Pas de librairie d'animation.
- **Images** : `next/image` utilise `preload` (et non `priority`, obsolète dans Next 16) ; composant `SanityImage`.
- **Couleurs** : uniquement via les variables de `src/app/globals.css` (`bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-accent`, `text-accent-foreground`…). Pas de couleurs Tailwind codées en dur.
- **Mode sombre** : classe `dark` sur `<html>` (next-themes) ; variante Tailwind `dark:`.
- **Polices** : Inter (texte, `font-sans`) et Plus Jakarta Sans (titres, `font-heading`).
- **Accessibilité** : contraste AA, focus visible, `aria-*` sur les boutons-icônes, `alt` sur les images, un seul `h1` par page, respect de `prefers-reduced-motion`.
- **Secrets** : jamais dans le code. Tout dans `.env.local` (ignoré par Git), documenté dans `.env.example`.

## Arborescence
- `src/app/[locale]/` : pages publiques · `src/app/studio/` : Sanity Studio (Phase 2)
- `src/components/layout|ui|sections|shared/` : composants
- `src/i18n/` : config next-intl et traductions · `src/lib/` : utilitaires
- `src/sanity/` : schémas, client, requêtes (Phase 2) · `src/proxy.ts` : redirection de langue
