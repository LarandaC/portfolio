import type { IconNames } from "../hooks/use-icon";

// Definición de la estructura de una habilidad
export type Skill = {
  name: string;
  level: string; // Tu nivel sigue siendo un string ('Avanzado', etc.)
  category: string;
  icon: IconNames; // Ahora espera uno de los nombres válidos de Lucide
};

export const skills: Skill[] = [
  //frontend skills
  {
    name: "HTML/CSS",
    level: "Avanzado",
    category: "frontend",
    icon: "Code",
  },
  {
    name: "JavaScript",
    level: "Avanzado",
    category: "frontend",
    icon: "FileJson",
  },
  {
    name: "React",
    level: "Avanzado",
    category: "frontend",
    icon: "Code",
  },
  {
    name: "Tailwind CSS",
    level: "Avanzado",
    category: "frontend",
    icon: "Code",
  },
  {
    name: "Material UI",
    level: "Avanzado",
    category: "frontend",
    icon: "Code",
  },
  //{ name: "Next.js", level: "Avanzado", category: "frontend", icon: "next-icon" },
  {
    name: "TypeScript",
    level: "Avanzado",
    category: "frontend",
    icon: "Code",
  },

  //backend skills
  {
    name: "Node.js",
    level: "Intermedio",
    category: "backend",
    icon: "Code",
  },
  {
    name: "Python",
    level: "Intermedio",
    category: "backend",
    icon: "Code",
  },
  //{ name: "Express", level: 75, category: "backend", icon: "express-icon" },
  {
    name: "PostgreSQL",
    level: "Intermedio",
    category: "backend",
    icon: "Database",
  },
  {
    name: "SQL Server",
    level: "Intermedio",
    category: "backend",
    icon: "Database",
  },

  //tools
  {
    name: "Git/GitHub",
    level: "Avanzado",
    category: "herramientas",
    icon: "Github",
  },
  {
    name: "Figma",
    level: "Avanzado",
    category: "herramientas",
    icon: "Code",
  },
  {
    name: "VS Code",
    level: "Avanzado",
    category: "herramientas",
    icon: "Code",
  },
  //{ name: "Docker", level: 60, category: "tools", icon: "docker-icon" },
];
