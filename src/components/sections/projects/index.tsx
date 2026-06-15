import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { projects } from "@/data/projects";
import { ProjectsHeader } from "./components/ProjectsHeader";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden bg-background">
      <span aria-hidden className="absolute select-none pointer-events-none font-family-display font-bold leading-none projects-ghost-number">
        04
      </span>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none section-top-border" />
      <div aria-hidden className="absolute bottom-0 right-0 pointer-events-none projects-ambient-glow" />

      <div className="max-w-6xl mx-auto relative z-[1]">
        <RevealOnScroll>
          <ProjectsHeader />
        </RevealOnScroll>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}

export default ProjectsSection;
