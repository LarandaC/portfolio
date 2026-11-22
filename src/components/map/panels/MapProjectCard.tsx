import { useActiveLang } from "@/hooks/useActiveLang";
import type { Project } from "@/data/projects";
import { Pill } from "@/components/common/Pill";
import { Card } from "@/components/common/Card";
import { ProjectActions } from "@/components/common/ProjectActions";

/** One project in the pagoda's panel: screenshot, summary, tags, links and the details modal. */
export function MapProjectCard({ project }: { project: Project }) {
  const lang = useActiveLang();
  const description = lang === "en" ? project.descriptionEn : project.descriptionEs;

  return (
    <Card as="article" variant="surface">
      <img src={project.image} alt={project.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-lg font-semibold tracking-[-.02em] text-ink">{project.title}</h4>
        <p className="text-sm leading-normal text-body">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Pill key={tag}>
              {tag}
            </Pill>
          ))}
        </div>
        <ProjectActions project={project} className="flex flex-wrap gap-2 pt-1" />
      </div>
    </Card>
  );
}
