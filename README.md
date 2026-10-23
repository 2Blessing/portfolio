# Portfolio · TCHABI Odilon

Portfolio et blog personnel : Next.js (App Router) + TypeScript + Tailwind CSS, contenu géré dans Sanity, hébergé sur Vercel.

> La documentation complète (Sanity, Formspree, déploiement) sera finalisée en Phase 7.
> Avancement du projet : voir [PROGRESS.md](PROGRESS.md).

## Prérequis

- Node.js 20 ou plus (développé avec Node 22)
- npm

## Installation

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs
```

## Commandes

| Commande | Rôle |
|---|---|
| `npm run dev` | Serveur de développement sur http://localhost:3000 |
| `npm run build` | Build de production (vérifie aussi TypeScript) |
| `npm run start` | Lance le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## Variables d'environnement

Voir [.env.example](.env.example). Ne jamais committer `.env.local`.
