import { getTranslations } from "next-intl/server";
import { FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { CopyLinkButton } from "./CopyLinkButton";

/** Boutons de partage d'un article : LinkedIn, WhatsApp, X, copier le lien (+ partage natif sur mobile). */
export async function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = await getTranslations("Share");
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const links = [
    { label: t("linkedin"), href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: FaLinkedin },
    { label: t("whatsapp"), href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: FaWhatsapp },
    { label: t("x"), href: `https://x.com/intent/post?text=${text}&url=${u}`, Icon: FaXTwitter },
  ];

  return (
    <section aria-labelledby="share-title">
      <h2 id="share-title" className="text-sm font-semibold">
        {t("title")}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
            </a>
          </li>
        ))}
        <CopyLinkButton url={url} title={title} />
      </ul>
    </section>
  );
}
