import type { LucideIcon } from "lucide-react";
import type { ExperienceEntry } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";

interface ExperienceTimelineProps {
  title: string;
  icon: LucideIcon;
  entries: ExperienceEntry[];
}

/** One titled group (work or education) with its own line that fills in as the section scrolls. */
export function ExperienceTimeline({ title, icon: Icon, entries }: ExperienceTimelineProps) {
  return (
    <div className="mt-[60px] max-tablet:mt-12">
      <h3 className="reveal mb-8 flex items-center justify-center gap-2.5 text-[clamp(20px,1.8vw,26px)] font-medium tracking-[-.03em] max-tablet:mb-6 max-tablet:justify-start">
        <span className="grid size-9 place-items-center rounded-full bg-pill text-brand">
          <Icon size={17} />
        </span>
        {title}
      </h3>

      <div className="timeline relative">
        <div
          className="absolute inset-y-0 left-1/2 -ml-px w-0.5 overflow-hidden rounded-[2px] bg-line max-tablet:left-[7px] max-tablet:ml-0"
          aria-hidden
        >
          <div className="timeline-progress absolute inset-0 origin-top bg-[linear-gradient(var(--color-brand-soft),var(--color-brand-bright))]" />
        </div>
        <ol className="grid grid-cols-2 gap-y-9 max-tablet:grid-cols-1 max-tablet:gap-y-7">
          {entries.map((entry, i) => (
            <ExperienceItem key={entry.id} entry={entry} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </ol>
      </div>
    </div>
  );
}
