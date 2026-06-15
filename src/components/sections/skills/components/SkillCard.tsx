import type { CSSProperties } from "react";
import type { Skill } from "@/data/skills";
import { useActiveLang } from "@/hooks/useActiveLang";
import { iconMap, levelDots } from "../const/constants";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const lang = useActiveLang();
  const Icon = iconMap[skill.icon];
  const dots = levelDots(skill.en);

  return (
    <div
      className="animate-card-enter skill-card-wrapper"
      style={{ "--delay": `${index * 45}ms` } as CSSProperties}
    >
      <div className="flex flex-col items-center gap-3 p-5 text-center skill-card">
        <div className="w-11 h-11 flex items-center justify-center skill-card-icon">
          <Icon size={24} />
        </div>
        <h3 className="font-semibold text-sm leading-tight skill-card-name">
          {skill.name}
        </h3>
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex gap-1.5 items-center">
            {[1, 2, 3].map((d) => (
              <span key={d} className={`block h-px w-4 skill-dash${d <= dots ? " active" : ""}`} />
            ))}
          </div>
          <span className="text-xs font-mono skill-level-text">
            {skill[lang]}
          </span>
        </div>
      </div>
    </div>
  );
}
