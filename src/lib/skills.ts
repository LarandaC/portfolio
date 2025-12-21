import type { IconNames } from "../hooks/use-icon";

// Definición de la estructura de una habilidad
export type Skill = {
  name: string;
  level: string;
  category: string;
  icon: IconNames;
};

export const skills = [
  // frontend
  {
    name: "HTML/CSS",
    level: "Avanzado",
    category: "frontend",
    icon: "HtmlRounded",
  },
  {
    name: "JavaScript",
    level: "Avanzado",
    category: "frontend",
    icon: "JavascriptRounded",
  },
  {
    name: "React",
    level: "Avanzado",
    category: "frontend",
    icon: "CodeRounded",
  },
  {
    name: "Material UI",
    level: "Avanzado",
    category: "frontend",
    icon: "DashboardRounded",
  },
  {
    name: "TypeScript",
    level: "Avanzado",
    category: "frontend",
    icon: "JavascriptRounded",
  },

  {
    name: "Angular",
    level: "Intermedio",
    category: "frontend",
    icon: "CodeRounded",
  },

  // backend
  {
    name: "Node.js",
    level: "Intermedio",
    category: "backend",
    icon: "JavascriptRounded",
  },
  {
    name: "Express",
    level: "Intermedio",
    category: "backend",
    icon: "JavascriptRounded",
  },
  {
    name: "Python",
    level: "Intermedio",
    category: "backend",
    icon: "CodeRounded",
  },
  {
    name: "PostgreSQL",
    level: "Intermedio",
    category: "backend",
    icon: "DatasetRounded",
  },
  {
    name: "SQL Server",
    level: "Intermedio",
    category: "backend",
    icon: "DatasetRounded",
  },

  // herramientas
  {
    name: "Git/GitHub",
    level: "Avanzado",
    category: "herramientas",
    icon: "GitHub",
  },
  {
    name: "VS Code",
    level: "Avanzado",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Cursor",
    level: "Avanzado",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Antigravity",
    level: "Avanzado",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Figma",
    level: "Avanzado",
    category: "herramientas",
    icon: "BrushRounded",
  },
];
