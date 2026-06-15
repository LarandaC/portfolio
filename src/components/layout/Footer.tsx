import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GOLD = "38 80% 55%";

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: "1px solid hsl(222 35% 10%)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <span
          className="font-family-display font-bold text-xs tracking-[0.18em] uppercase"
          style={{ color: "hsl(220 15% 28%)" }}
        >
          LETICIA ARANDA
        </span>

        {/* Copyright */}
        <p
          className="font-mono text-xs"
          style={{ color: "hsl(220 15% 28%)" }}
        >
          &copy; {new Date().getFullYear()} &middot; {t("footer.title")}
        </p>

        {/* Scroll to top */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="transition-colors duration-200 cursor-pointer"
              style={{ color: "hsl(220 15% 28%)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = `hsl(${GOLD} / 0.6)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "hsl(220 15% 28%)";
              }}
            >
              <ArrowUp size={16} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">{t("footer.scrollToTop")}</TooltipContent>
        </Tooltip>
      </div>
    </footer>
  );
};
