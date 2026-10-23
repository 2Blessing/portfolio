/**
 * Layout racine du Studio, séparé de celui du site (src/app/[locale]/layout.tsx) :
 * le Studio n'utilise ni l'en-tête, ni le pied de page, ni les styles du site.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
