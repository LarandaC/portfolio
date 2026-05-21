import { ExternalLink, GithubIcon } from "lucide-react";
import { useActiveLang } from "@/hooks/useActiveLang";

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
  const lang = useActiveLang();
  const description = lang === "en" ? descriptionEn : descriptionEs;

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
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/5 text-primary border border-primary/20 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} GitHub`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
