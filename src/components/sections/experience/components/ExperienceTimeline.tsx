import { useTranslation } from "react-i18next";
import type { ExperienceEntry } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

function ExperienceColumn({ entries, label }: { entries: ExperienceEntry[]; label: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent/50 mb-6">
        {label}
      </p>
      <div className="flex flex-col">
        {entries.map((entry, index) => (
          <ExperienceItem
            key={entry.id}
            entry={entry}
            isLast={index === entries.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const { t } = useTranslation();
  const laboral   = entries.filter((e) => e.type === "work" || e.type === "freelance");
  const formacion = entries.filter((e) => e.type === "education");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
      <ExperienceColumn entries={laboral}   label={t("experience.columnWork")} />
      <ExperienceColumn entries={formacion} label={t("experience.columnEducation")} />
    </div>
  );
}
