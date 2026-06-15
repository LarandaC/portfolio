import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
  const highlights  = lang === "en" ? project.highlightsEn     : project.highlightsEs;
  const labelCode   = lang === "en" ? "View code"              : "Ver código";
  const labelLive   = lang === "en" ? "Live demo"              : "Demo en vivo";
  const labelHighlights = lang === "en" ? "TECHNICAL HIGHLIGHTS" : "ASPECTOS TÉCNICOS";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl p-0 gap-0 flex flex-col max-h-[90dvh] overflow-hidden w-[calc(100%-2rem)] sm:w-full project-modal">

        {/* Image header */}
        <div className="relative h-40 sm:h-56 flex-shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 project-modal-img-overlay" />
          <div className="absolute bottom-3 left-5 right-10">
            <DialogTitle className="font-family-display font-bold text-lg sm:text-xl leading-tight project-card-title">
              {project.title}
            </DialogTitle>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tags.map((tag) => (
                <span key={tag} className="font-mono text-xs px-2 py-0.5 project-modal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-5 flex flex-col gap-5">
          <p className="text-sm leading-relaxed project-modal-desc">
            {description}
          </p>

          <div>
            <p className="font-mono text-xs tracking-[0.28em] uppercase mb-3 project-modal-highlights-label">
              {labelHighlights}
            </p>
            <ul className="flex flex-col gap-2">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5 project-modal-highlight-icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-1 pb-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-4 py-2 project-modal-btn-code"
              >
                <Github size={14} />
                {labelCode}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase px-4 py-2 project-modal-btn-live"
              >
                <ExternalLink size={14} />
                {labelLive}
              </a>
            )}
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
