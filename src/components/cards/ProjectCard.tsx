import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useActiveLang } from "@/hooks/useActiveLang";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
        className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={props.image}
            alt={props.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pb-3 pl-4">
            <span className="text-xs text-primary-foreground font-medium bg-primary/80 px-2.5 py-1 rounded-full">
              {t("projects.viewDetails")}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 font-bold text-foreground">{props.title}</h3>

          <p className="text-foreground text-sm min-h-[3rem]">{description}</p>

          <div className="flex flex-wrap gap-2 my-4 justify-center">
            {props.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            {props.githubUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={props.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${props.title} GitHub`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{t("projects.viewCode")}</TooltipContent>
              </Tooltip>
            )}
            {props.liveUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={props.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${props.title} live demo`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{t("projects.liveDemo")}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <ProjectModal
        project={props}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
