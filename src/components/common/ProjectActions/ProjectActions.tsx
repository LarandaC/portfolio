import { lazy, Suspense, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/projects";
import { Button } from "@/components/common/Button";

// Downloaded on first open.
const ProjectModal = lazy(() =>
  import("@/components/common/ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

type ProjectActionsProps = {
  project: Project;
  detailsVariant?: "primary" | "ghost";
  className?: string;
};

/** Details (modal), code and demo links. */
export function ProjectActions({ project, detailsVariant = "primary", className }: ProjectActionsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      <Button
        variant={detailsVariant}
        onClick={() => {
          setLoaded(true);
          setOpen(true);
        }}
      >
        {t("projects.viewDetails")}
      </Button>
      {project.githubUrl && (
        <Button variant="icon" href={project.githubUrl} external aria-label={`${project.title} — ${t("projects.viewCode")}`}>
          <Github size={15} />
        </Button>
      )}
      {project.liveUrl && (
        <Button variant="icon" href={project.liveUrl} external aria-label={`${project.title} — ${t("projects.liveDemo")}`}>
          <ExternalLink size={15} />
        </Button>
      )}
      {loaded && (
        <Suspense fallback={null}>
          <ProjectModal project={project} open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
