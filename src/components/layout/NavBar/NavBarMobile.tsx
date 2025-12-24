import { navItems } from "@/lib/navigation";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { Close } from "@mui/icons-material";
import { Github, Linkedin, Mail } from "lucide-react";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

interface NavBarMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/LarandaC",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/leticia-aranda-871575238/",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:leticia.m.aranda@gmail.com",
    icon: Mail,
  },
];

export const NavBarMobile = ({
  isMenuOpen,
  setIsMenuOpen,
}: NavBarMobileProps) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-background/95 backdrop-blur-md z-50 p-6 flex flex-col justify-between transition-transform duration-300 border border-l-1 border-l-border ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-foreground p-2 rounded-full hover:bg-foreground/10 transition"
              aria-label={t("nav.closeMenu")}
            >
              <Close />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-3 text-left">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg text-foreground hover:text-primary transition-colors rounded-md px-2 py-1 font-semibold"
              >
                {item[i18n.language.includes("en") ? "en" : "es"]}
              </a>
            ))}
          </nav>
        </div>

        {/* Social Links */}
        <div className="pt-6 mt-6">
          <div className="flex gap-3 justify-left">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-foreground/10"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <div className="sm:block fixed bottom-5 right-5 z-50">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
};
