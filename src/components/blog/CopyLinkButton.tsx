"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { FaLink, FaCheck, FaShareNodes } from "react-icons/fa6";

const buttonClass =
  "inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-accent hover:text-accent";

/**
 * Bouton « Copier le lien » + bouton « Partager… » (menu de partage du téléphone,
 * affiché seulement si le navigateur le permet).
 */
export function CopyLinkButton({ url, title }: { url: string; title: string }) {
  const t = useTranslations("Share");
  const [copied, setCopied] = useState(false);
  // navigator.share n'existe que dans le navigateur (et surtout sur mobile).
  // Côté serveur on répond « non », puis le navigateur corrige après l'affichage.
  const canShare = useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator.share === "function",
    () => false,
  );

  // Le message « Lien copié ! » disparaît après 2 secondes.
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Presse-papiers indisponible (ex. page non sécurisée) : on sélectionne via une invite.
      window.prompt(t("copy"), url);
    }
  }

  async function share() {
    try {
      await navigator.share({ title, url });
    } catch {
      // Partage annulé par l'utilisateur : rien à faire.
    }
  }

  return (
    <>
      <li>
        <button type="button" onClick={copy} className={buttonClass}>
          {copied ? <FaCheck aria-hidden="true" className="h-3.5 w-3.5 text-success" /> : <FaLink aria-hidden="true" className="h-3.5 w-3.5" />}
          {copied ? t("copied") : t("copy")}
        </button>
        {/* Annonce la copie aux lecteurs d'écran */}
        <span className="sr-only" aria-live="polite">
          {copied ? t("copied") : ""}
        </span>
      </li>
      {canShare && (
        <li>
          <button type="button" onClick={share} className={buttonClass}>
            <FaShareNodes aria-hidden="true" className="h-3.5 w-3.5" />
            {t("native")}
          </button>
        </li>
      )}
    </>
  );
}

// La disponibilité de navigator.share ne change pas : rien à écouter.
function noopSubscribe() {
  return () => {};
}
