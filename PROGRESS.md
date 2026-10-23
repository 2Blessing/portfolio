# Suivi du projet : Portfolio TCHABI Odilon

> Journal de bord tenu à jour à chaque étape. Il permet de reprendre le travail sans relire tout le code.
> Légende : ✅ fait · 🔄 en cours · ⏳ à faire · ⏸️ en attente (action du propriétaire)

**Dernière mise à jour :** 23/10/2026
**Phase actuelle :** Phase 1 terminée, **en attente de validation** avant la Phase 2.

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
- ⏸️ Sanity (sanity.io) : nécessaire pour la **Phase 2**
- ⏸️ GitHub : nécessaire pour la Phase 7 (ou avant, pour sauvegarder le code)
- ⏸️ Formspree : nécessaire pour la Phase 5
- ⏸️ Vercel : nécessaire pour la Phase 7 (se connecter avec GitHub)

---

## Phase 1 : Initialisation et mise en page ✅
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

## Phase 2 : Sanity ⏳
- ⏳ Créer le projet Sanity (`npx sanity login`, puis init) → `NEXT_PUBLIC_SANITY_PROJECT_ID`
- ⏳ Studio intégré sur `/studio` (layout racine séparé dans `src/app/studio/`)
- ⏳ Types utilitaires : `localeString`, `localeText`, `localeBlockContent`
- ⏳ Schémas : profile (unique), siteSettings (unique), journeyEntry, skill, project, post, category, testimonial
- ⏳ Organisation du Studio (structure.ts), client, helper images, requêtes GROQ avec tags
- ⏳ Afficher les données du Profil sur l'accueil (test de connexion)
- ⏳ Réseaux sociaux du pied de page depuis le Profil

## Phase 3 : Pages ⏳
- ⏳ Accueil complet (photo, boutons Projets / CV / Contact, 3 derniers projets, derniers articles, témoignages masquables)
- ⏳ À propos · Parcours (frise) · Compétences (catégories + niveau) · Projets (liste + détail) · CV (en ligne + PDF)
- ⏳ Composant d'animation au défilement (`Reveal`)

## Phase 4 : Blog ⏳
- ⏳ Liste paginée, filtre par catégorie, page article, temps de lecture, date, boutons de partage

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
- **npm audit** signale 5 vulnérabilités « high » dans des dépendances de développement de create-next-app. À revoir avant le déploiement (Phase 7), sans `--force`.
- `AGENTS.md` est régénéré par `next dev` (règles Next.js pour les agents) : le garder dans Git.

## Historique des commits
| Commit | Contenu |
|---|---|
| `3103eda` | Initialisation create-next-app |
| *(voir `git log`)* | Phase 1 |
