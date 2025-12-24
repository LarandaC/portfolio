import type { IconNames } from "../hooks/use-icon";

// Definición de la estructura de una habilidad
export type Skill = {
  name: string;
  level: string;
  es: string;
  en: string;
  category: string;
  icon: IconNames;
};

export const skills: Skill[] = [
  // frontend
  {
    name: "HTML/CSS",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "HtmlRounded",
  },
  {
    name: "JavaScript",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "JavascriptRounded",
  },
  {
    name: "React",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "CodeRounded",
  },
  {
    name: "Material UI",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "DashboardRounded",
  },
  {
    name: "TypeScript",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "JavascriptRounded",
  },

  {
    name: "Angular",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "frontend",
    icon: "CodeRounded",
  },

  // backend
  {
    name: "Node.js",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "JavascriptRounded",
  },
  {
    name: "Express",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "JavascriptRounded",
  },
  {
    name: "Python",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "CodeRounded",
  },
  {
    name: "PostgreSQL",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "DatasetRounded",
  },
  {
    name: "SQL Server",
    level: "Intermedio",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "DatasetRounded",
  },

  // herramientas
  {
    name: "Git/GitHub",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "GitHub",
  },

  {
    name: "VS Code",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Cursor",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Antigravity",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "CodeRounded",
  },
  {
    name: "Figma",
    level: "Avanzado",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "BrushRounded",
  },
];
