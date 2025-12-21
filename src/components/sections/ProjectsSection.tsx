import { RevealOnScroll } from "../shared/RevealOnScroll";
import { projects } from "@/lib/projects";
import { ProjectCarousel } from "../ui/ProjectCarousel";

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-28 px-4">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 font-family-title">
            Proyectos
          </h2>

          {/* Descripción subtítulo */}
          <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
            Estos son algunos de mis proyectos recientes. Cada uno fue
            desarrollado con atención al detalle, rendimiento y experiencia de
            usuario.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4 mb-12" />
          {/* Grid de Proyectos */}
          <ProjectCarousel projects={projects} />
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default ProjectsSection;
