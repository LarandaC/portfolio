import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { projects } from "@/data/projects";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { useTranslation } from "react-i18next";

export const ProjectsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="projects" className="relative py-28 px-4">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Título de la sección */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 font-family-title">
            {t("projects.title")}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-3 mb-5" />
          <p className="text-center text-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {t("projects.description")}
          </p>
          {/* Grid de Proyectos */}
          <ProjectCarousel projects={projects} />
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default ProjectsSection;
