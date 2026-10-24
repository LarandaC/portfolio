import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectPanel } from "./ProjectPanel";

/** Row of panels; the hovered/focused one expands, the rest collapse to strips. */
export function ProjectsTrack({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <div
      className="absolute inset-0 z-2 flex max-tablet:relative max-tablet:inset-auto max-tablet:mt-10 max-tablet:flex-col"
      id="track"
    >
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.id}
          project={project}
          index={i}
          active={active === i}
          onActivate={() => setActive(i)}
        />
      ))}
    </div>
  );
}
