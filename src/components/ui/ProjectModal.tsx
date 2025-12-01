import { ExternalLink, GithubIcon, X } from "lucide-react";
import { useEffect } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    //scroll
    document.body.style.overflow = "hidden";

    //esc
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Habilita el scroll
      document.body.style.overflow = "scroll";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-background/90 z-50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-80 overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card cursor-pointer transition-colors duration-200"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6 text-primary" />
          </button>

          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <h3 className="text-3xl font-bold mb-1 text-foreground">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-base mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 items-center justify-center">
            {project.tags.map((tag, tagKey) => (
              <span
                key={tagKey}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center p-4 mr-2 mb-2">
          <div className="flex space-x-4">
            <a
              title="Ver Demo"
              className="text-foreground hover:text-primary transition-colors duration-300"
              target="_blank"
              href={project.demoUrl}
            >
              <ExternalLink size={24} />
            </a>

            <a
              title="Ver Código en GitHub"
              className="text-foreground hover:text-primary transition-colors duration-300"
              target="_blank"
              href={project.githubUrl}
            >
              <GithubIcon size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
