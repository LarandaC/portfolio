import { RevealOnScroll } from "../shared/RevealOnScroll";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Button } from "../ui/Button";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <RevealOnScroll>
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Proyectos
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Estos son algunos de mis proyectos recientes. Cada uno fue
            desarrollado con atención al detalle, rendimiento y experiencia de
            usuario.
          </p>

          <ProjectCard projects={projects} />

          <div className="text-center mt-16">
            <Button href="https://github.com/LarandaC" text="Mira mi GitHub" />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
