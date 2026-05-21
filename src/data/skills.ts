export type SkillIcon =
  | "FileCode2"
  | "Braces"
  | "Atom"
  | "LayoutDashboard"
  | "Triangle"
  | "Server"
  | "Database"
  | "Github"
  | "Paintbrush"
  | "MousePointer2"
  | "Figma"
  | "Code2";

export type Skill = {
  name: string;
  es: string;
  en: string;
  category: string;
  icon: SkillIcon;
};

export const skills: Skill[] = [
  // frontend
  { name: "HTML/CSS",     es: "Avanzado",    en: "Advanced",     category: "frontend",      icon: "FileCode2" },
  { name: "JavaScript",   es: "Avanzado",    en: "Advanced",     category: "frontend",      icon: "Braces" },
  { name: "TypeScript",   es: "Avanzado",    en: "Advanced",     category: "frontend",      icon: "Braces" },
  { name: "React",        es: "Avanzado",    en: "Advanced",     category: "frontend",      icon: "Atom" },
  { name: "Angular",      es: "Intermedio",  en: "Intermediate", category: "frontend",      icon: "Triangle" },
  { name: "Material UI",  es: "Avanzado",    en: "Advanced",     category: "frontend",      icon: "LayoutDashboard" },

  // backend
  { name: "Node.js",      es: "Intermedio",  en: "Intermediate", category: "backend",       icon: "Server" },
  { name: "Express",      es: "Intermedio",  en: "Intermediate", category: "backend",       icon: "Server" },
  { name: "Python",       es: "Intermedio",  en: "Intermediate", category: "backend",       icon: "Code2" },
  { name: "PostgreSQL",   es: "Intermedio",  en: "Intermediate", category: "backend",       icon: "Database" },
  { name: "SQL Server",   es: "Intermedio",  en: "Intermediate", category: "backend",       icon: "Database" },

  // herramientas
  { name: "Git/GitHub",   es: "Avanzado",    en: "Advanced",     category: "herramientas",  icon: "Github" },
  { name: "VS Code",      es: "Avanzado",    en: "Advanced",     category: "herramientas",  icon: "Code2" },
  { name: "Cursor",       es: "Avanzado",    en: "Advanced",     category: "herramientas",  icon: "MousePointer2" },
  { name: "Figma",        es: "Avanzado",    en: "Advanced",     category: "herramientas",  icon: "Figma" },
];
