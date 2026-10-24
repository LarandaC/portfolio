export interface NavItem {
  id: string;
  href: string;
  labelKey: string;
}

export const navItems: NavItem[] = [
  { id: "home", href: "#hero", labelKey: "nav.index" },
  { id: "about", href: "#about", labelKey: "nav.about" },
  { id: "projects", href: "#projects", labelKey: "nav.projects" },
  { id: "skills", href: "#skills", labelKey: "nav.skills" },
  { id: "experience", href: "#experience", labelKey: "nav.experience" },
  { id: "contact", href: "#contact", labelKey: "nav.contact" },
];
