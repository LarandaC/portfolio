import { lazy, Suspense, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useActiveLang } from "@/hooks/useActiveLang";
import type { Project } from "@/data/projects";
import { NUM_COLORS } from "../const/constants";

// The detail modal (Radix Dialog) is only downloaded once it is first opened.
const ProjectModal = lazy(() =>
  import("@/components/cards/ProjectModal").then((m) => ({ default: m.ProjectModal }))
);

interface ProjectPanelProps {
  project: Project;
  index: number;
  active: boolean;
  onActivate: () => void;
}

export function ProjectPanel({ project, index, active, onActivate }: ProjectPanelProps) {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoaded, setModalLoaded] = useState(false);

  const description = lang === "en" ? project.longDescriptionEn : project.longDescriptionEs;

  // The accordion only exists on desktop; on mobile the panels are a stacked list.
  const activate = () => {
    if (window.matchMedia("(min-width: 761px)").matches) onActivate();
  };

  const openDetails = () => {
    setModalLoaded(true);
    setModalOpen(true);
  };

  return (
    <div
      data-active={active}
      className="panel group relative h-full flex-[0_0_clamp(96px,11vw,170px)] cursor-pointer overflow-hidden border-r border-line outline-none transition-[flex-grow] duration-900 ease-[cubic-bezier(.77,0,.18,1)] last:border-r-0 focus-visible:shadow-[inset_0_0_0_2px_var(--color-brand-soft)] data-[active=true]:grow data-[active=true]:cursor-default max-tablet:h-auto max-tablet:flex-none max-tablet:cursor-auto max-tablet:overflow-visible max-tablet:border-t max-tablet:border-r-0"
      tabIndex={0}
      aria-label={`${index + 1}: ${project.title}`}
      onMouseEnter={activate}
      onFocus={activate}
      onClick={activate}
    >
      <div className="panel-in absolute bottom-[10vh] left-[clamp(14px,1.8vw,28px)] flex w-max items-end gap-[clamp(16px,2vw,30px)] max-tablet:relative max-tablet:bottom-auto max-tablet:left-auto max-tablet:w-auto max-tablet:gap-[18px] max-tablet:px-4 max-tablet:py-7 max-phone:flex-col max-phone:items-start">
        <span
          className={`text-[clamp(170px,36vh,380px)] leading-[.74] font-semibold tracking-[-.07em] max-tablet:text-[150px] ${NUM_COLORS[index % NUM_COLORS.length]}`}
        >
          {index + 1}
        </span>

        {/* Projects  */}
        <div className="pointer-events-none relative w-[min(440px,32vw)] -translate-x-6 pb-1 opacity-0 blur-[6px] tablet:[transition:opacity_.4s,translate_.5s,filter_.4s] group-data-[active=true]:pointer-events-auto group-data-[active=true]:translate-x-0 group-data-[active=true]:opacity-100 group-data-[active=true]:blur-none tablet:group-data-[active=true]:[transition:opacity_.7s_.4s,translate_.9s_.35s_cubic-bezier(.2,.8,.2,1),filter_.7s_.4s] max-tablet:pointer-events-auto max-tablet:w-auto max-tablet:translate-x-0 max-tablet:opacity-100 max-tablet:blur-none">
          <div className="mb-4 aspect-video overflow-hidden rounded-[14px] border border-line bg-pill shadow-shot">
            <img className="size-full object-cover" src={project.image} alt={project.title} loading="lazy" />
          </div>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mb-1.5 text-[clamp(20px,1.7vw,26px)] font-normal tracking-[-.03em]">
            {project.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-[1.45] text-body">{description}</p>
          <div className="mt-4 flex items-center gap-2">
            <button className="btn-ghost" onClick={openDetails}>
              {t("projects.viewDetails")} →
            </button>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${t("projects.viewCode")}`}
                className="icon-btn"
              >
                <Github size={15} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${t("projects.liveDemo")}`}
                className="icon-btn"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      {modalLoaded && (
        <Suspense fallback={null}>
          <ProjectModal project={project} open={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
}
