import { ArrowRight, ExternalLink, GithubIcon } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";

const projects = [
  {
    id: 1,
    title: "SaaS Landing Page",
    description: "Un landing page usando React y Tailwind",
    image: "/projects/landing-page-saas.png",
    tags: ["React", "TailwindCSS", "TypeScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/landing-page",
  },
  {
    id: 2,
    title: "Bank Landing Page",
    description: "Landing page para un banco usando React y Tailwind",
    image: "/projects/landing-page-banco.png",
    tags: ["React", "TailwindCSS", "TypeScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/landing-page-bank",
  },
  {
    id: 3,
    title: "RESTEplorer",
    description: "Sitio web conectada a la API REST Countries",
    image: "/projects/react-route.png",
    tags: ["React", "React-router", "TailwindCSS", "TypeScript", "RESTful API"],
    demoUrl: "#",
    githubUrl: "https://github.com/LarandaC/paises-react-route",
  },
  {
    id: 4,
    title: "The Simpsons Blog",
    description: "Blog de Los Simpsons usando The Simpsons API",
    image: "/projects/the-simpsons-blog.png",
    tags: ["React", "React-router", "TailwindCSS", "TypeScript", "RESTful API"],
    demoUrl: "https://larandac.github.io/the-simpson-blog/",
    githubUrl: "https://github.com/LarandaC/the-simpson-blog",
  },
];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, key) => (
              <div
                key={key}
                className="group bg-card rounded-xl overflow-hidden shadow-md border border-border/70 card-hover flex flex-col"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.description}
                    className="w-full h-full object-cover "
                  />
                </div>

                {/* Contenido principal de la tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-1 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>

                  {/* Etiquetas (Tags) */}
                  <div className="flex flex-wrap gap-2 mb-4 items-start">
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

                {/* Footer de la Tarjeta*/}
                <div className="flex justify-between items-center p-6 border-t border-border/70">
                  <div className="flex space-x-4">
                    <a
                      title="Ver Demo"
                      className="text-foreground hover:text-primary transition-colors duration-300"
                      target="_blank"
                      href={project.demoUrl}
                    >
                      <ExternalLink size={24} />
                    </a>

                    {/* Enlace de GitHub */}
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
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              className="cosmic-button w-fit flex items-center mx-auto gap-2 text-lg px-6 py-3 rounded-lg shadow-xl"
              target="_blank"
              href="https://github.com/LarandaC"
            >
              Mira mi GitHub <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
