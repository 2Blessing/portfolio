import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border border-border text-foreground hover:border-accent hover:text-accent",
  ghost: "text-accent hover:bg-accent-soft",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";

type Variant = keyof typeof variants;

/** Lien en forme de bouton, vers une page du site (langue ajoutée automatiquement). */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={cn(base, variants[variant], className)} {...props} />;
}

/** Lien en forme de bouton vers un site externe ou un fichier. */
export function ExternalButtonLink({
  variant = "primary",
  className,
  newTab = true,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; newTab?: boolean }) {
  return (
    <a
      className={cn(base, variants[variant], className)}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
