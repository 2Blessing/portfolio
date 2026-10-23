import { cn } from "@/lib/utils";

/** Petite étiquette (technologie, catégorie, langue…). */
export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        tone === "accent"
          ? "bg-accent-soft text-accent"
          : "border border-border bg-background text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
