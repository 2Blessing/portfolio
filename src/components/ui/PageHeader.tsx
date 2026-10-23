import { Container } from "./Container";

/** En-tête de page : grand titre (h1) + phrase d'introduction. */
export function PageHeader({ title, intro }: { title: string; intro?: string | null }) {
  return (
    <div className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
      </Container>
    </div>
  );
}
