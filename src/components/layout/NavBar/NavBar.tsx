import { useEffect, useRef, useState, useMemo } from "react";
import { navItems } from "@/lib/navigation";
import { NavBarMobile } from "./NavBarMobile";
import { Menu } from "lucide-react";
import icon from "@/assets/icon/icon-2.png";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { LanguageSelector } from "../LanguageSelector";
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(isMenuOpen);
  isMenuOpenRef.current = isMenuOpen;

  const { t } = useTranslation();

  const sectionIds = useMemo(
    () => navItems.map((item) => item.href.replace("#", "")),
    []
  );
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          if (isMenuOpenRef.current) setIsMenuOpen(false);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a
              href="#hero"
              className="flex items-center font-bold text-lg md:text-xl"
            >
              <img src={icon} alt="Icono" className="w-10 h-10" />
              <span className="ml-2">Leticia Aranda</span>
            </a>

            <div className="flex items-center gap-5">
              <nav className="hidden md:flex items-center gap-5">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`font-semibold transition-opacity ${
                        isActive
                          ? "text-primary border-b border-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                    >
                      {t(item.labelKey)}
                    </a>
                  );
                })}
              </nav>
              <LanguageSelector />
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-foreground p-1 rounded-md hover:bg-foreground/10 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <NavBarMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
