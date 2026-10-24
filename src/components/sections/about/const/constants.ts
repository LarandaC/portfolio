import { Code, PaintBucket, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiFigma, SiNextdotjs, SiNodedotjs, SiReact, SiTypescript } from "react-icons/si";
import type { IconType } from "react-icons";

export const SERVICES: { icon: LucideIcon; key: string }[] = [
  { icon: Code, key: "aboutWebDevelopmentCard" },
  { icon: PaintBucket, key: "aboutDesignCard" },
  { icon: Rocket, key: "aboutOptCard" },
];

/** Main stack shown under the service tickets. */
export const TECH_LOGOS: { name: string; icon: IconType }[] = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Figma", icon: SiFigma },
];
