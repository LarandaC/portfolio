import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import { MapProjectCard } from "./MapProjectCard";

/** "Proyectos" inside the pagoda: every project as a card. */
export function ProjectsPanel() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm leading-normal text-muted-ink">{t("projects.description")}</p>
      {projects.map((project) => (
        <MapProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
