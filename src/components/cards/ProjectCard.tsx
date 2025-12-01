import { useState } from "react";
import { ProjectModal } from "../ui/ProjectModal";
import { createPortal } from "react-dom";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  projects: Project[];
}

export const ProjectCard = ({ projects }: ProjectCardProps) => {
  // 1. Estado para el modal: cuál proyecto está activo y si es visible
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, key) => (
          <div
            key={key}
            className="group bg-card rounded-xl overflow-hidden shadow-md border border-border/70 card-hover flex flex-col"
          >
            <div
              className="w-full overflow-hidden h-56 cursor-pointer"
              onClick={() => openModal(project)} // Llama a openModal al hacer clic
            >
              <img
                src={project.image}
                alt={project.description}
                className="w-full h-full object-cover transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-grow">
              <h3 className="text-xl font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {selectedProject &&
        document.getElementById("modal-root") &&
        createPortal(
          <ProjectModal project={selectedProject} onClose={closeModal} />,
          document.getElementById("modal-root")! // Renderiza el modal
        )}
    </>
  );
};
