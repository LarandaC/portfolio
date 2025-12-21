import { useEffect, useState } from "react";
import { navItems } from "../../../lib/navigation";
import { NavBarMobile } from "./NavBarMobile";
import { Menu } from "lucide-react";
import { Close } from "@mui/icons-material";
import icon from "../../../assets/icon/icon-2.png";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sectionIds = navItems.map((item) => item.href.replace("#", ""));
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          if (isMenuOpen) setIsMenuOpen(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md shadow-md py-4 border-b border-border/50"
            : "bg-transparent py-4"
        } text-foreground`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center font-bold text-lg md:text-xl"
            >
              <img src={icon} alt="Icono" className="w-10 h-10" />
              <span className="ml-2">Leticia Aranda</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`font-semibold transition-opacity ${
                      isActive
                        ? "text-primary border-b border-primary "
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden text-foreground"
              aria-label="menu"
            >
              {isMenuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <NavBarMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
