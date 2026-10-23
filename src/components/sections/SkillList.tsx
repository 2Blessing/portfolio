import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import type { Skill, SkillCategory } from "@/sanity/lib/types";

// Ordre d'affichage des catégories
export const skillCategoryOrder: SkillCategory[] = ["languages", "frameworks", "tools", "ai", "soft"];

/** Regroupe les compétences par catégorie (les catégories vides sont ignorées). */
export function groupSkills(skills: Skill[]) {
  return skillCategoryOrder
    .map((category) => ({ category, items: skills.filter((s) => s.category === category) }))
    .filter((g) => g.items.length > 0);
}

/** Liste de compétences avec une jauge de 5 segments. */
export async function SkillList({ skills }: { skills: Skill[] }) {
  const t = await getTranslations("Skills");

  return (
    <ul className="space-y-4">
      {skills.map((skill) => {
        const levelName = t(`levels.${skill.level}`);
        return (
          <li key={skill._id}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-xs text-muted" aria-hidden="true">
                {levelName}
              </span>
            </div>
            {/* Jauge visuelle ; le texte pour lecteurs d'écran est dans sr-only */}
            <div className="mt-2 flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((step) => (
                <span
                  key={step}
                  className={cn("h-1.5 flex-1 rounded-full", step <= skill.level ? "bg-accent" : "bg-border")}
                />
              ))}
            </div>
            <span className="sr-only">{t("levelLabel", { level: skill.level, name: levelName })}</span>
          </li>
        );
      })}
    </ul>
  );
}
