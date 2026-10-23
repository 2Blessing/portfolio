import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

/** Page 404 traduite. */
export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <Container className="py-24 text-center">
      <p className="font-heading text-6xl font-extrabold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-bold">{t("title")}</h1>
      <p className="mt-2 text-muted">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
      >
        {t("back")}
      </Link>
    </Container>
  );
}
