# Suivi du projet : Portfolio TCHABI Odilon

> Journal de bord tenu à jour à chaque étape. Il permet de reprendre le travail sans relire tout le code.
> Légende : ✅ fait · 🔄 en cours · ⏳ à faire · ⏸️ en attente (action du propriétaire)

**Dernière mise à jour :** 28/10/2026
**Phase actuelle :** Phase 4 (Blog) terminée, **en attente de validation** avant la Phase 5 (Contact + bilingue).

---

## Décisions validées
| Sujet | Choix |
|---|---|
| Nom affiché | TCHABI Odilon |
| Palette | **A : Bleu nuit + Ambre** (accent `#B45309` en clair, `#F59E0B` en sombre) |
| Polices | Inter (texte) + Plus Jakarta Sans (titres) |
| Traductions Sanity | Champs `{ fr, en }` dans le même document, repli sur `fr` |
| i18n site | next-intl 4, routes `/fr` et `/en`, `/` redirige selon la langue du navigateur |
| Versions | Next.js 16.4.3, React 19.3, Tailwind v4, next-intl 4.14, next-themes 0.4 |

## Comptes à créer (propriétaire)
- ✅ Sanity : projet `portfolio`, ID `uvbbv2dh`, dataset `production` (public)
- ⏸️ GitHub : nécessaire pour la Phase 7 (ou avant, pour sauvegarder le code)
- ⏸️ Formspree : nécessaire pour la Phase 5
- ⏸️ Vercel : nécessaire pour la Phase 7 (se connecter avec GitHub)

---

## Phase 1 : Initialisation et mise en page ✅ (validée)
- ✅ Projet Next.js 16 + TypeScript + Tailwind v4 + ESLint (create-next-app), Git initialisé
- ✅ `.gitignore` (ignore `.env*` sauf `.env.example`), `.env.example`, `README.md`, `CLAUDE.md`, `PROGRESS.md`
- ✅ Bilingue : `src/i18n/` (routing, navigation, request), `src/proxy.ts`, traductions `messages/fr.json` et `en.json`
- ✅ Palette en variables CSS + mode sombre (`globals.css`), polices via `next/font`
- ✅ Mode sombre/clair : `ThemeProvider` + `ThemeToggle` (préférence système, choix mémorisé, pas de flash)
- ✅ En-tête collant : nom, menu ordinateur, menu mobile (Échap, retour, défilement bloqué), sélecteur FR/EN qui garde la page en cours
- ✅ Pied de page : liens rapides, emplacement réseaux, droits
- ✅ Lien d'évitement « Aller au contenu », focus visible, réduction des animations
- ✅ Pages temporaires : accueil (provisoire), about, journey, skills, projects, cv, blog, contact ; page 404 traduite
- ✅ Vérifié : `lint`, `tsc` et `build` passent ; toutes les pages FR/EN pré-rendues ; redirections `/` → `/fr` et `/en` testées

**Comment tester :** `npm run dev` → http://localhost:3000 (redirige vers `/fr`). Tester le menu, le bouton FR/EN, le bouton soleil/lune, le menu mobile (outils développeur, mode téléphone), une URL inconnue (`/fr/xyz`).

## Phase 2 : Sanity ✅ (validée)
- ✅ Paquets : sanity 6, next-sanity 13, @sanity/image-url, @sanity/vision, @sanity/code-input, @sanity/locale-fr-fr (Studio en français), styled-components, react-icons
- ✅ Briques : `localeString`, `localeText`, `localeBlockContent`, `blockContent` (titres, listes, liens, images, code), `imageWithAlt` ; validation `frRequired`
- ✅ Schémas : profile (unique), siteSettings (unique), journeyEntry, skill, project, post, category, testimonial (`src/sanity/schemaTypes/`)
- ✅ Studio : `sanity.config.ts`, `sanity.cli.ts`, menu `src/sanity/structure.ts`, route `src/app/studio/[[...tool]]` (layout racine séparé)
- ✅ Lecture : `client.ts`, `fetch.ts` (`"use cache"` + `cacheTag(type)` + `cacheLife("hours")`), `image.ts` (`urlFor`), `queries.ts` (GROQ avec repli FR), `data.ts`, `types.ts`
- ✅ Site branché : accueil (nom, titre, accroche, photo du Profil), pied de page (nom + réseaux sociaux du Profil, icônes react-icons)
- ✅ `tsc` et `lint` passent
- ✅ Projet Sanity `uvbbv2dh`, dataset `production` (public) → `.env.local` ; `build` OK, `/studio` répond
- ✅ Cache Sanity de quelques secondes en `npm run dev` (sinon 1 h, en attendant le webhook)
- ✅ Origine CORS `http://localhost:3000` ajoutée par le propriétaire
- ✅ Test : Profil rempli dans le Studio et visible sur l'accueil
- ✅ Commits Phase 2 (schémas, Studio, connexion)

## Phase 3 : Pages ✅ (validée)
- ✅ Requêtes GROQ testées sur les vraies données : projets (liste, 3 derniers, détail, slugs), parcours, compétences, témoignages, 3 derniers articles (avec temps de lecture calculé en GROQ) ; types et fonctions dans `data.ts`
- ✅ Composants : `ButtonLink`/`ExternalButtonLink`, `PageHeader`, `SectionHeading`, `Badge`, `SanityImage` (next/image + `preload`), `RichText` (Portable Text + `prose`, images, blocs de code, liens), `ProjectCard`, `PostCard`, `TestimonialCard`, `Timeline`, `SkillList`
- ✅ Animations au défilement : classe CSS `reveal` (`animation-timeline: view()`, sans JavaScript, désactivée si `prefers-reduced-motion`)
- ✅ Accueil : disponibilité, titre, nom, accroche, photo, boutons Projets / CV (si PDF) / Contact, réseaux, 3 projets, 3 articles, témoignages (si activés dans Paramètres)
- ✅ À propos : bio (texte riche), photo, langues, centres d'intérêt, appel à l'action
- ✅ Parcours : sommaire + frise par rubrique (formations, expériences, stages, certifications) + langues + centres d'intérêt
- ✅ Compétences : cartes par catégorie, jauge 5 segments + texte pour lecteurs d'écran
- ✅ Projets : liste + page détail pré-rendue (`generateStaticParams`, valeur bidon si aucun projet), métadonnées et image Open Graph
- ✅ CV : version en ligne générée depuis Parcours/Compétences/Profil + téléchargement PDF (`?dl=`) + aperçu PDF (grands écrans)
- ✅ Studio : slugs générés sans accents ni caractères spéciaux + validation (minuscules, chiffres, tirets)
- ✅ Pied de page : rubrique « Réseaux » masquée si aucun réseau ; couleur `--success` ajoutée
- ✅ Vérifié : tsc, lint, build (36 pages) ; captures d'écran ordinateur + mobile (Edge headless)

## Phase 4 : Blog ✅
- ✅ Routes pré-rendues (pas de `searchParams`) : `/blog`, `/blog/page/[n]`, `/blog/category/[slug]`, `/blog/category/[slug]/page/[n]`, `/blog/[slug]`
- ✅ Requêtes : page d'articles + total (`POSTS_PAGE_QUERY`, filtre `$category`), catégories non vides avec nombre d'articles, article complet + 3 autres articles, slugs ; `POSTS_PER_PAGE = 6` dans `data.ts`
- ✅ Composants `src/components/blog/` : `BlogListing` (+ `parsePageParam`, `countPages`, `blogListingMetadata`), `CategoryFilter` (liens, `aria-current`), `Pagination` (précédent/suivant/numéros, `rel=prev/next`), `ShareButtons` (LinkedIn, WhatsApp, X) + `CopyLinkButton` (copie + partage natif du téléphone, annonce `aria-live`)
- ✅ Page article : catégories cliquables, titre, résumé, date, temps de lecture, image, contenu riche, partage, « À lire aussi » ; métadonnées Open Graph `article`
- ✅ `src/lib/site.ts` : `siteUrl` / `absoluteUrl` (liens de partage complets, via `NEXT_PUBLIC_SITE_URL`)
- ✅ Studio : slug d'article interdit pour `page` et `category` ; regex des accents remplacée par `\p{M}` (lisible)
- ✅ Vérifié : tsc, lint, build (58 pages), routes et codes HTTP, captures ordinateur + mobile FR/EN
- ⏸️ À tester avec plus de contenu : pagination (7+ articles) et filtre (articles liés à des catégories)

## Phase 5 : Contact et bilingue ⏳
- ⏳ Formulaire (zod, Server Action, Formspree), champ piège, limitation d'envois, bouton WhatsApp, réseaux
- ⏳ Finitions FR/EN (repli de contenu, `hreflang`)

## Phase 6 : SEO, accessibilité, performance ⏳
- ⏳ Métadonnées par page, Open Graph, `sitemap.xml`, `robots.txt`, Vercel Analytics, Lighthouse 90+

## Phase 7 : Déploiement ⏳
- ⏳ GitHub, Vercel, variables d'environnement, webhook Sanity → `/api/revalidate`, tests mobile, README complet

## Phase 8 (plus tard) ⏳
- ⏳ Newsletter (service à proposer) · Témoignages

---

## Points ouverts / à surveiller
- **Page 404 (URL inconnue)** : avec `cacheComponents`, le HTML initial est une coquille vide et le contenu 404 (traduit, avec en-tête et pied de page) s'affiche une fois le JavaScript chargé. Le code HTTP est bien 404 et la page n'est pas indexée. À revoir en Phase 6 si besoin.
- **Première visite d'une adresse inconnue** (ex. `/fr/blog/xyz`) : code 200 au lieu de 404 (streaming de Next : le statut part avant le `notFound()`), puis 404 aux visites suivantes. La page 404 s'affiche quand même, avec `noindex`. À revoir en Phase 6.
- Les liens de partage utilisent `NEXT_PUBLIC_SITE_URL` : à régler sur l'adresse Vercel en Phase 7 (sinon ils pointent vers localhost).
- **npm audit** signale 5 vulnérabilités « high » dans des dépendances de développement de create-next-app. À revoir avant le déploiement (Phase 7), sans `--force`.
- **Données de test** dans Sanity : le slug du projet (`mypressing;com`) est invalide → le régénérer dans le Studio (bouton « Générer »). Idem slug de la catégorie (`QDFD`).
- Captures mobiles : Edge headless ne descend pas sous ~500 px de large ; tester à 390 px dans les outils de développement.
- `AGENTS.md` est régénéré par `next dev` (règles Next.js pour les agents) : le garder dans Git.

## Historique des commits
| Commit | Contenu |
|---|---|
| `3103eda` | Initialisation create-next-app |
| *(voir `git log`)* | Phase 1 |
