import type { RefObject } from "react";
import type { Skill } from "@/data/skills";
import { SkillCard } from "./SkillCard";

interface SkillGridProps {
  skills:         Skill[];
  animKey:        number;
  gridWrapperRef: RefObject<HTMLDivElement>;
}

export function SkillGrid({ skills, animKey, gridWrapperRef }: SkillGridProps) {
  return (
    <div ref={gridWrapperRef}>
      {/* Re-keying replays the card-enter animation after each filter change. */}
      <div
        key={animKey}
        className="grid grid-cols-5 gap-2.5 max-desktop:grid-cols-4 max-tablet:grid-cols-3 max-phone:grid-cols-2"
      >
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
