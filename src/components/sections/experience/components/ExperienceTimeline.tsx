import type { ExperienceEntry } from "@/data/experience";
import { ExperienceItem } from "./ExperienceItem";

/** Vertical timeline; the progress line fills in as the section scrolls. */
export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="timeline relative mt-[60px]">
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
  );
}
