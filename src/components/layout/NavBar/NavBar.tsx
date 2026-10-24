import { lazy, Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "@/lib/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";

// The mobile sheet (Radix Dialog) is only downloaded the first time the menu opens.
const NavBarMobile = lazy(() =>
  import("./NavBarMobile").then((m) => ({ default: m.NavBarMobile }))
);

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const isMenuOpenRef = useRef(isMenuOpen);
  isMenuOpenRef.current = isMenuOpen;

  const { t } = useTranslation();

  const sectionIds = useMemo(
    () => navItems.map((item) => item.href.replace("#", "")),
    []
  );
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpenRef.current) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="nav fixed inset-x-0 top-[18px] z-50 mx-auto flex w-max max-w-[calc(100%-28px)] items-center gap-7 rounded-full bg-surface/90 py-[5px] pr-[5px] pl-4 shadow-nav backdrop-blur-[8px] max-tablet:top-3.5 max-tablet:w-[calc(100%-28px)] max-tablet:justify-between max-tablet:gap-3 max-tablet:pl-3">
        <a
          className="flex items-center gap-1.5 text-[19px] font-medium tracking-[-.04em] whitespace-nowrap max-tablet:text-[17px]"
          href="#hero"
          aria-label="Leticia Aranda — inicio"
        >
          <BrandLogo />
          Leticia Aranda
        </a>

        <div className="flex items-center gap-0.5 max-desktop:hidden">
          {navItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`rounded-full px-3 py-[7px] text-[13px] font-medium whitespace-nowrap transition-colors duration-[250ms] ${
                activeSection === item.href.slice(1)
                  ? "bg-pill text-pill-ink"
                  : "text-nav hover:bg-nav-hover"
              }`}
            >
              {t(item.labelKey)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <LanguageSelector />
          <button
            onClick={() => {
              setMenuLoaded(true);
              setIsMenuOpen(true);
            }}
            className="hidden size-9 items-center justify-center rounded-full bg-pill text-pill-ink max-desktop:inline-flex"
            aria-label="Abrir menú"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {menuLoaded && (
        <Suspense fallback={null}>
          <NavBarMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </Suspense>
      )}
    </>
  );
};
