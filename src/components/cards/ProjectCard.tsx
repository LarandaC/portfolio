import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  title: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export function ProjectCard({
  title,
  descriptionEn,
  descriptionEs,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const { i18n } = useTranslation();

  const currentDescription = i18n.language.includes("en")
    ? descriptionEn
    : descriptionEs;

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-bold text-foreground">{title}</h3>

        <p className="text-muted-foreground text-sm min-h-[3rem]">
          {currentDescription}
        </p>

        {/* Etiquetas */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex justify-end gap-4`}>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <Github size={18} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
