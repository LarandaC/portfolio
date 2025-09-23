import { ArrowRight, ExternalLink, GithubIcon } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "Un landing page usando React y Tailwind",
    image: "/projects/landing-page-saas.png",
    tags: ["React", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/landing-page",
  },
  {
    id: 2,
    title: "Bank Landing Page",
    description: "Landing page para un banco usando React y Tailwind",
    image: "/projects/landing-page-banco.png",
    tags: ["React", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/landing-page-bank",
  },
  {
    id: 3,
    title: "RESTEplorer",
    description: "Sitio web conectada a la API REST Countries",
    image: "/projects/react-route.png",
    tags: ["React", "React-router", "TailwindCSS"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/paises-react-route",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Proyectos <span className="text-primary">destacados</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Estos son algunos de mis proyectos recientes. Cada uno fue
          desarrollado con atención al detalle, rendimiento y experiencia de
          usuario.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.description}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secundary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      target="_blank"
                      href={project.demoUrl}
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      target="_blank"
                      href={project.githubUrl}
                    >
                      <GithubIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https:github.com/Laranda"
          >
            Mira mi GitHub <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
