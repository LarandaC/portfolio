import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ExperienceEntry, ExperienceType } from "@/data/experience";

const TYPE_ICONS: Record<ExperienceType, LucideIcon> = {
  work:      Briefcase as LucideIcon,
  education: GraduationCap as LucideIcon,
  freelance: Code2 as LucideIcon,
};

const TYPE_KEYS: Record<ExperienceType, string> = {
  work:      "experience.typeWork",
  education: "experience.typeEducation",
  freelance: "experience.typeFreelance",
};

interface ExperienceItemProps {
  entry: ExperienceEntry;
  isLast: boolean;
}

export function ExperienceItem({ entry, isLast }: ExperienceItemProps) {
  const { t } = useTranslation();
  const Icon  = TYPE_ICONS[entry.type];
  const label = t(TYPE_KEYS[entry.type]);
  const role        = t(`experience.entries.${entry.id}.role`,        { defaultValue: entry.role });
  const description = t(`experience.entries.${entry.id}.description`, { defaultValue: entry.description });

  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center shrink-0" style={{ width: "15px" }}>
        <div className="experience-item-dot" />
        {!isLast && <div className="experience-item-connector" />}
      </div>

      <div className="flex flex-col gap-2 pb-10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`experience-type-badge experience-type-${entry.type}`}>
            <Icon size={10} />
            {label}
          </span>
          <span className="font-mono text-xs tracking-[0.12em] text-accent/70">
            {entry.period}
          </span>
        </div>
        <h3 className="font-family-display font-bold text-xl leading-tight text-foreground">
          {role}
        </h3>
        <p className="font-mono text-xs tracking-[0.1em] text-primary">
          {entry.organization}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground max-w-lg mt-1">
          {description}
        </p>
      </div>
    </div>
  );
}
