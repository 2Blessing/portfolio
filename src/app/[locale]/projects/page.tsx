import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Nav");
  return { title: t("projects") };
}

// Contenu réel en Phase 3+ (données Sanity).
export default function Page() {
  return <PagePlaceholder pageKey="projects" />;
}
