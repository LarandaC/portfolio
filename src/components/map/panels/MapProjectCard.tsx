import { lazy, Suspense, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useActiveLang } from "@/hooks/useActiveLang";
import type { Project } from "@/data/projects";
import { Button } from "@/components/common/Button";
import { Pill } from "@/components/common/Pill";
import { Card } from "@/components/common/Card";

const ProjectModal = lazy(() =>
  import("@/components/common/ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

/** One project in the pagoda's panel: screenshot, summary, tags, links and the details modal. */
export function MapProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            onClick={() => {
              setLoaded(true);
              setOpen(true);
            }}
          >
            {t("projects.viewDetails")}
          </Button>
          {project.githubUrl && (
            <Button variant="icon" href={project.githubUrl} external aria-label={`${project.title} — ${t("projects.viewCode")}`}>
              <Github className="size-4" />
            </Button>
          )}
          {project.liveUrl && (
            <Button variant="icon" href={project.liveUrl} external aria-label={`${project.title} — ${t("projects.liveDemo")}`}>
              <ExternalLink className="size-4" />
            </Button>
          )}
        </div>
      </div>
      {loaded && (
        <Suspense fallback={null}>
          <ProjectModal project={project} open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </Card>
  );
}
