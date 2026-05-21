export interface NavItem {
  id: string;
  href: string;
  labelKey: string;
}

export const navItems: NavItem[] = [
  { id: "home", href: "#hero", labelKey: "nav.index" },
  { id: "about", href: "#about", labelKey: "nav.about" },
  { id: "skills", href: "#skills", labelKey: "nav.skills" },
  { id: "projects", href: "#projects", labelKey: "nav.projects" },
  { id: "contact", href: "#contact", labelKey: "nav.contact" },
];
