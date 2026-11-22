import { lazy, Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Map as MapIcon, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navItems } from "@/lib/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useMapEnabled } from "@/hooks/useMapEnabled";
import { BrandLogo } from "@/components/common/BrandLogo";
import { LanguageSelector } from "../LanguageSelector";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "@/components/common/Button";

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
  // The map only exists where it can run; elsewhere /inicio is this same classic page.
  const mapEnabled = useMapEnabled();

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
          {mapEnabled && (
            // Text on desktop, icon only on smaller screens.
            <Button
              variant="ghost"
              to="/inicio"
              aria-label={t("map.explore")}
              className="max-desktop:size-9 max-desktop:px-0"
            >
              <MapIcon size={16} />
              <span className="max-desktop:hidden">{t("map.explore")}</span>
            </Button>
          )}
          {/* On phones the theme switch lives in the menu sheet, to keep this bar short. */}
          <ThemeToggle className="max-tablet:hidden" />
          <LanguageSelector />
          <Button
            variant="icon"
            onClick={() => {
              setMenuLoaded(true);
              setIsMenuOpen(true);
            }}
            className="hidden size-9 text-pill-ink max-desktop:inline-flex"
            aria-label={t("nav.openMenu")}
          >
            <Menu size={18} />
          </Button>
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
