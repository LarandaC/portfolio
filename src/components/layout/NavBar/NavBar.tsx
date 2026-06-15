import { useEffect, useRef, useState, useMemo } from "react";
import { navItems } from "@/lib/navigation";
import { NavBarMobile } from "./NavBarMobile";
import { Menu } from "lucide-react";
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
          setIsScrolled(window.scrollY > 30);
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
        className={`navbar-header fixed w-full z-50 transition-all duration-500 py-5${isScrolled ? " is-scrolled" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              className="navbar-logo font-family-display font-bold tracking-[0.12em] uppercase text-sm"
            >
              LETICIA ARANDA
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={`navbar-link font-mono text-xs tracking-[0.2em] uppercase transition-colors${isActive ? " is-active" : ""}`}
                  >
                    {t(item.labelKey)}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-5">
              <LanguageSelector />
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="navbar-menu-btn md:hidden p-1 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <NavBarMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};
