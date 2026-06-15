import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useTranslation } from "react-i18next";
import { socialLinks } from "@/data/social";

interface NavBarMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const NavBarMobile = ({
  isMenuOpen,
  setIsMenuOpen,
}: NavBarMobileProps) => {
  const { t } = useTranslation();

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetContent
        side="right"
        className="w-72 sm:w-80 bg-card flex flex-col border-l border-primary/20 p-0 overflow-hidden"
      >
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

        <div className="h-[3px] w-full btn-gradient shrink-0" />

        <div className="px-6 pt-6 pb-3">
          <p className="font-family-display text-[10px] tracking-[0.35em] uppercase text-accent">
            Navegación
          </p>
        </div>

        <nav className="flex flex-col flex-1 px-6">
          {navItems.map((item, index) => (
            <SheetClose asChild key={item.id}>
              <a
                href={item.href}
                className="group flex items-center gap-4 py-4 border-b border-border/50 last:border-0"
              >
                <span className="font-family-display text-xs font-bold text-accent/40 w-5 shrink-0 group-hover:text-accent transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-family-display text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {t(item.labelKey)}
                </span>
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="border-t border-border px-6 py-5 flex items-center justify-between">
          <div className="flex gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/10"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
