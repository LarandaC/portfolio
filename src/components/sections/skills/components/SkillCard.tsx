import type { Skill } from "@/data/skills";
import { useActiveLang } from "@/hooks/useActiveLang";
import { iconMap, levelDots } from "../const/constants";
import { Card } from "@/components/common/Card";

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
      className="animate-card-enter motion-reduce:animate-none"
      style={{ animationDelay: `${index * 45}ms` }}
    >
      <Card variant="tile" className="flex h-full flex-col items-center gap-2.5 px-3 pt-5 pb-4 text-center">
        <div className="flex size-11 items-center justify-center rounded-xl bg-pill text-brand">
          <Icon size={22} />
        </div>
        <h3 className="text-[13.5px] font-medium tracking-[-.01em]">{skill.name}</h3>
        <div className="flex gap-1" aria-hidden>
          {[1, 2, 3].map((d) => (
            <span key={d} className={`h-[3px] w-3.5 rounded-[2px] ${d <= dots ? "bg-brand-bright" : "bg-line"}`} />
          ))}
        </div>
        <span className="text-[11px] text-stone">{skill[lang]}</span>
      </Card>
    </div>
  );
}
