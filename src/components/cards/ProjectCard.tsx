import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <>
      <div className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <h3 className="mb-2 font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-transparent text-primary border border-primary rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`flex justify-end ${
              githubUrl && liveUrl ? "gap-4" : "gap-2"
            }`}
          >
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
                <span>Código</span>
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={20} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
