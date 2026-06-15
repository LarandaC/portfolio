import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useActiveLang } from "@/hooks/useActiveLang";
import { useTranslation } from "react-i18next";
import { ProjectModal } from "@/components/cards/ProjectModal";
import type { Project } from "@/data/projects";

type ProjectCardProps = Project;

export function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [modalOpen, setModalOpen] = useState(false);

  const description = lang === "en" ? props.descriptionEn : props.descriptionEs;

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) return;
    setModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group relative overflow-hidden cursor-pointer transition-all duration-300 project-card"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={props.image}
            alt={props.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 project-card-overlay" />

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {props.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 project-card-tag">
                {tag}
              </span>
            ))}
          </div>

          {/* View details badge */}
          <div className="absolute top-3 left-3 font-mono text-xs px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 project-card-badge">
            {t("projects.viewDetails")} →
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-family-display font-bold text-base leading-snug project-card-title">
              {props.title}
            </h3>

            <div className="flex gap-3 shrink-0 pt-0.5">
              {props.githubUrl && (
                <a
                  href={props.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${props.title} GitHub`}
                  className="project-card-link project-card-link-github"
                >
                  <Github size={15} />
                </a>
              )}
              {props.liveUrl && (
                <a
                  href={props.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${props.title} live demo`}
                  className="project-card-link project-card-link-live"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed project-card-desc">
            {description}
          </p>
        </div>

        {/* Bottom gold bar */}
        <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 project-card-bar" />
      </div>

      <ProjectModal
        project={props}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
