import { getTranslations } from "next-intl/server";
import { Container } from "./Container";
import type { NavKey } from "@/lib/nav";

/** Page temporaire (Phase 1) : titre + message « bientôt disponible ». */
export async function PagePlaceholder({ pageKey }: { pageKey: NavKey }) {
  const t = await getTranslations();
  return (
    <Container className="py-16 sm:py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(`Nav.${pageKey}`)}</h1>
      <p className="mt-4 max-w-2xl text-muted">{t("Placeholder.soon")}</p>
    </Container>
  );
}
