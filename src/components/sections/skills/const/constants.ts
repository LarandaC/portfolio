import { Layers, Monitor, Server, Wrench, Bot } from "lucide-react";
import {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiAngular, SiMui, SiNextdotjs,
  SiNodedotjs, SiExpress, SiPython, SiPostgresql,
  SiGit, SiFigma, SiOpenai, SiClaude, SiAnthropic, SiZapier, SiN8N,
} from "react-icons/si";
import { DiMsqlServer, DiVisualstudio } from "react-icons/di";
import type { IconType } from "react-icons";
import type { SkillIcon } from "@/data/skills";
import { skills } from "@/data/skills";

export const iconMap: Record<SkillIcon, IconType> = {
  SiHtml5, SiJavascript, SiTypescript, SiReact, SiAngular, SiMui, SiNextdotjs,
  SiNodedotjs, SiExpress, SiPython, SiPostgresql, DiMsqlServer,
  SiGit, DiVisualstudio, SiFigma,
  SiOpenai, SiClaude, SiAnthropic, SiZapier, SiN8N,
};

export const levelDots = (level: string): number => {
  if (level === "Advanced")     return 3;
  if (level === "Intermediate") return 2;
  return 1;
};

export const categoryData = [
  { id: "todos",         label: "skills.categories.all",     icon: Layers  },
  { id: "frontend",     label: "skills.categories.frontend", icon: Monitor },
  { id: "backend",      label: "skills.categories.backend",  icon: Server  },
  { id: "herramientas", label: "skills.categories.tools",    icon: Wrench  },
  { id: "ia",           label: "skills.categories.ia",       icon: Bot     },
];

export const categoryCounts: Record<string, number> = {
  todos:        skills.length,
  frontend:     skills.filter((s) => s.category === "frontend").length,
  backend:      skills.filter((s) => s.category === "backend").length,
  herramientas: skills.filter((s) => s.category === "herramientas").length,
  ia:           skills.filter((s) => s.category === "ia").length,
};
