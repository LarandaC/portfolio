import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ExperienceType } from "@/data/experience";

export const TYPE_ICONS: Record<ExperienceType, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  freelance: Code2,
};

export const TYPE_KEYS: Record<ExperienceType, string> = {
  work: "experience.typeWork",
  education: "experience.typeEducation",
  freelance: "experience.typeFreelance",
};
