import { ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useActiveLang } from "@/hooks/useActiveLang";
import { useTranslation } from "react-i18next";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const lang = useActiveLang();
  const { t } = useTranslation();

  if (!project) return null;

  const description = lang === "en" ? project.longDescriptionEn : project.longDescriptionEs;
  const highlights = lang === "en" ? project.highlightsEn : project.highlightsEs;
  const labelHighlights = lang === "en" ? "Technical highlights" : "Aspectos técnicos";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        // Lets the modal body scroll natively instead of Lenis capturing the wheel.
        data-lenis-prevent
        className="flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-[26px] border-line bg-surface p-0 shadow-[0_30px_60px_rgba(10,20,30,.18)] sm:w-full sm:rounded-[26px]"
      >
        <div className="relative h-[clamp(160px,28vh,230px)] shrink-0 overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-scrim)_72%,transparent),transparent_65%)] after:content-['']">
          <img className="size-full object-cover" src={project.image} alt={project.title} />
          <div className="absolute right-12 bottom-4 left-[22px] z-1 text-white">
            {/* Classes go on DialogTitle so tailwind-merge drops its default text-lg/font-semibold. */}
            <DialogTitle asChild className="text-[clamp(20px,2.4vw,26px)] leading-none font-medium tracking-[-.03em]">
              <h2>{project.title}</h2>
            </DialogTitle>
            <div className="force-light mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="pill bg-white/88">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-[22px]">
          <p className="text-sm leading-[1.55] text-body">{description}</p>

          <div>
            <p className="mb-2.5 text-[11px] font-semibold tracking-[.08em] text-brand uppercase">
              {labelHighlights}
            </p>
            <ul className="flex flex-col gap-2">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-[1.4]">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-bright" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.githubUrl && (
              <a className="btn" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={14} />
                {t("projects.viewCode")}
              </a>
            )}
            {project.liveUrl && (
              <a className="btn-ghost" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
                {t("projects.liveDemo")}
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
