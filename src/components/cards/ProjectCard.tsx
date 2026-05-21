import { ExternalLink, Github } from "lucide-react";
import { useActiveLang } from "@/hooks/useActiveLang";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectCardProps {
  title: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  descriptionEn,
  descriptionEs,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const description = lang === "en" ? descriptionEn : descriptionEs;

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-bold text-foreground">{title}</h3>

        <p className="text-foreground text-sm min-h-[3rem]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 my-4 justify-center">
          {tags.map((tag) => (
            <Badge key={tag} variant="tag">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          {githubUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} GitHub`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>{t("projects.viewCode")}</TooltipContent>
            </Tooltip>
          )}
          {liveUrl && (
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title} live demo`}
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
  );
}
