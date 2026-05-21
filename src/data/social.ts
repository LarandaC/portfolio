import { GithubIcon, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/LarandaC",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/leticia-aranda-871575238/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:leticia.m.aranda@gmail.com",
    icon: Mail,
  },
];
