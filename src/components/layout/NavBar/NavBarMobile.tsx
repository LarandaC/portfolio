import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
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
        className="w-72 sm:w-80 bg-background/95 backdrop-blur-md flex flex-col justify-between border-l border-border p-6"
      >
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>

        <nav className="flex flex-col gap-1 text-left mt-6">
          {navItems.map((item) => (
            <SheetClose asChild key={item.id}>
              <a
                href={item.href}
                className="text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 transition-colors rounded-lg px-3 py-2"
              >
                {t(item.labelKey)}
              </a>
            </SheetClose>
          ))}
        </nav>

        <div className="border-t border-border pt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
};
