import { lazy, Suspense, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useActiveLang } from "@/hooks/useActiveLang";
import type { Project } from "@/data/projects";

const ProjectModal = lazy(() =>
  import("@/components/cards/ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

/** One project in the pagoda's panel: screenshot, summary, tags, links and the details modal. */
export function MapProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const description = lang === "en" ? project.descriptionEn : project.descriptionEs;

  return (
    <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
      <img src={project.image} alt={project.title} loading="lazy" className="aspect-[16/9] w-full object-cover" />
      <div className="flex flex-col gap-3 p-5">
        <h4 className="text-lg font-semibold tracking-[-.02em] text-ink">{project.title}</h4>
        <p className="text-sm leading-normal text-body">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setLoaded(true);
              setOpen(true);
            }}
          >
            {t("projects.viewDetails")} →
          </button>
          {project.githubUrl && (
            <a className="icon-btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${t("projects.viewCode")}`}>
              <Github className="size-4" />
            </a>
          )}
          {project.liveUrl && (
            <a className="icon-btn" href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${t("projects.liveDemo")}`}>
              <ExternalLink className="size-4" />
            </a>
          )}
        </div>
      </div>
      {loaded && (
        <Suspense fallback={null}>
          <ProjectModal project={project} open={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </article>
  );
}
