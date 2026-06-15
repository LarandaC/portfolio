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
      <div
        key={animKey}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
      >
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
