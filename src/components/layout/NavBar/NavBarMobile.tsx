import { Sheet, SheetContent, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { navItems } from "@/lib/navigation";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTranslation } from "react-i18next";
import { socialLinks } from "@/data/social";
import { BrandLogo } from "@/components/shared/BrandLogo";

interface NavBarMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const NavBarMobile = ({ isMenuOpen, setIsMenuOpen }: NavBarMobileProps) => {
  const { t } = useTranslation();

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetContent side="right" className="flex w-80 flex-col overflow-hidden border-l border-line bg-surface p-0">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

        <div className="flex items-center gap-1.5 px-6 pt-6 pb-2 text-[19px] font-medium tracking-[-.04em] whitespace-nowrap max-tablet:text-[17px]">
          <BrandLogo />
          leticia aranda
        </div>

        <nav className="flex flex-col flex-1 px-6 pt-4">
          {navItems.map((item, index) => (
            <SheetClose asChild key={item.id}>
              <a
                href={item.href}
                className="flex items-baseline gap-3.5 border-b border-line py-3.5 text-[26px] tracking-[-.03em] transition-colors duration-[250ms] last:border-b-0 hover:text-brand"
              >
                <span className="text-xs font-semibold text-brand-bright">{String(index + 1).padStart(2, "0")}</span>
                {t(item.labelKey)}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="flex items-center justify-between border-t border-line px-6 py-5">
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="icon-btn"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
