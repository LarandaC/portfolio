import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { projects } from "@/lib/projects";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { useTranslation } from "react-i18next";

export const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative py-28 px-4">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 font-family-title">
            {t("projects.title")}
          </h2>

          {/* Descripción subtítulo */}
          <p className="text-center text-muted-foreground mb-4 max-w-2xl mx-auto">
            {t("projects.description")}
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
