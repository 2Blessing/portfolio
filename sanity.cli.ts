/**
 * Configuration pour la ligne de commande Sanity (`npx sanity ...`),
 * ex. `npx sanity cors add`, `npx sanity dataset export`.
 */
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
