export interface NavItem {
  name: string;
  href: string;
  en: string;
  es: string;
}

export const navItems: NavItem[] = [
  { name: "Inicio", href: "#hero", en: "Home", es: "Inicio" },
  { name: "Sobre mi", href: "#about", en: "About", es: "Sobre mi" },
  { name: "Skills", href: "#skills", en: "Skills", es: "Skills" },
  { name: "Proyectos", href: "#projects", en: "Projects", es: "Proyectos" },
  { name: "Contacto", href: "#contact", en: "Contact", es: "Contacto" },
];
