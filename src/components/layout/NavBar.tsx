import { cn } from "../../lib/utils";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

// Para recorrer la lista de elementos del menú de navegación
const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Sobre mi", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
];

export const NavBar = () => {
  // Estado para manejar el estado de desplazamiento
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efecto para manejar el evento de desplazamiento
  // Se agrega un listener al evento de scroll para cambiar el estado de isScrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  // funcion para abrir el menu con scroll al principio
  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      // Si estamos desplazados, primero ir al principio
      if (isScrolled) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Esperar a que termine el scroll antes de abrir el menú
        setTimeout(() => setIsMenuOpen(true), 800);
      } else {
        setIsMenuOpen(true);
      }
    }
  };

  // Utiliza la clase cn para aplicar estilos condicionales
  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#hero"
          className="text-xl font-bold text-primary flex items-center"
        >
          <span className="relativa z-10">
            {""}
            <span className="text-glow text-foreground">EleTech</span>{" "}
            Portafolio
          </span>
        </a>
        {/* desktop*/}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-foreground/80 font-semibold hover:text-primary transition-colors duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* mobile*/}
        {/* Boton de menu cuando la pantalla es mobile, si es mobile es otro tipo de menu */}
        <button
          onClick={handleMenuToggle}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {""}
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300",
            "md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 invisible pointer-events-none translate-y-[-10%]"
          )}
        >
          <div className="flex flex-col space-y-8 items-center text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 "
                onClick={() => setIsMenuOpen(false)} // Cierra el menú al hacer clic
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
