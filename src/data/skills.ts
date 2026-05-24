export type SkillIcon =
  | "SiHtml5"
  | "SiJavascript"
  | "SiTypescript"
  | "SiReact"
  | "SiAngular"
  | "SiMui"
  | "SiNextdotjs"
  | "SiNodedotjs"
  | "SiExpress"
  | "SiPython"
  | "SiPostgresql"
  | "DiMsqlServer"
  | "SiGit"
  | "DiVisualstudio"
  | "SiFigma"
  | "SiOpenai"
  | "SiClaude"
  | "SiAnthropic"
  | "SiZapier"
  | "SiN8N";

export type Skill = {
  name: string;
  es: string;
  en: string;
  category: string;
  icon: SkillIcon;
};

export const skills: Skill[] = [
  // frontend
  {
    name: "HTML/CSS",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiHtml5",
  },
  {
    name: "JavaScript",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiJavascript",
  },
  {
    name: "TypeScript",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiTypescript",
  },
  {
    name: "React",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiReact",
  },
  {
    name: "Angular",
    es: "Intermedio",
    en: "Intermediate",
    category: "frontend",
    icon: "SiAngular",
  },
  {
    name: "Material UI",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiMui",
  },
  {
    name: "Next.js",
    es: "Avanzado",
    en: "Advanced",
    category: "frontend",
    icon: "SiNextdotjs",
  },

  // backend
  {
    name: "Node.js",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "SiNodedotjs",
  },
  {
    name: "Express",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "SiExpress",
  },
  {
    name: "Python",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "SiPython",
  },
  {
    name: "PostgreSQL",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "SiPostgresql",
  },
  {
    name: "SQL Server",
    es: "Intermedio",
    en: "Intermediate",
    category: "backend",
    icon: "DiMsqlServer",
  },

  // herramientas
  {
    name: "Git/GitHub",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "SiGit",
  },
  {
    name: "VS Code",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "DiVisualstudio",
  },
  {
    name: "Figma",
    es: "Avanzado",
    en: "Advanced",
    category: "herramientas",
    icon: "SiFigma",
  },

  // ia
  {
    name: "AI Integrations",
    es: "Intermedio",
    en: "Intermediate",
    category: "ia",
    icon: "SiOpenai",
  },
  {
    name: "AI Chatbots",
    es: "Intermedio",
    en: "Intermediate",
    category: "ia",
    icon: "SiClaude",
  },
  {
    name: "Prompt Engineering",
    es: "Intermedio",
    en: "Intermediate",
    category: "ia",
    icon: "SiAnthropic",
  },
  {
    name: "Automation",
    es: "Intermedio",
    en: "Intermediate",
    category: "ia",
    icon: "SiZapier",
  },
  {
    name: "AI Agents",
    es: "Intermedio",
    en: "Intermediate",
    category: "ia",
    icon: "SiN8N",
  },
];
