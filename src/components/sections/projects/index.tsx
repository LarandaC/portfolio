import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectsCloud } from "./components/ProjectsCloud";
import { ProjectsTrack } from "./components/ProjectsTrack";

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      className="relative h-screen min-h-[760px] overflow-hidden bg-surface max-tablet:h-auto max-tablet:min-h-0 max-tablet:pt-[14vh] max-tablet:pb-10"
    >
      <ProjectsCloud />
      <SectionHeader
        className="absolute top-[11vh] z-4 w-full px-4 max-tablet:relative max-tablet:top-auto"
        label={`02 · ${t("projects.title")}`}
        title={[t("projects.title")]}
      >
        <p className="reveal max-w-[540px] text-center text-sm leading-normal text-muted-ink short-desktop:hidden">
          {t("projects.description")}
        </p>
      </SectionHeader>
      <ProjectsTrack projects={projects} />
    </section>
  );
}

export default ProjectsSection;
