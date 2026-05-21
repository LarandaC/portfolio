import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useActiveLang } from "@/hooks/useActiveLang";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const lang = useActiveLang();

  if (!project) return null;

  const description = lang === "en" ? project.longDescriptionEn : project.longDescriptionEs;
  const highlights = lang === "en" ? project.highlightsEn : project.highlightsEs;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 flex flex-col max-h-[90dvh] overflow-hidden w-[calc(100%-2rem)] sm:w-full rounded-xl">

        {/* Imagen — altura menor en móvil */}
        <div className="relative h-40 sm:h-56 flex-shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-3 left-5 right-10">
            <DialogTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight">
              {project.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="tag" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido scrollable */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
              {lang === "en" ? "Technical highlights" : "Aspectos técnicos"}
            </h4>
            <ul className="flex flex-col gap-2">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-1 pb-1">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm" className="gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={15} />
                  {lang === "en" ? "View code" : "Ver código"}
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="gradient" size="sm" className="gap-2">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={15} />
                  {lang === "en" ? "Live demo" : "Demo en vivo"}
                </a>
              </Button>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
