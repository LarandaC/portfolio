import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-[250ms] hover:border-brand-soft ${className}`}
      aria-label={isDark ? t("theme.light") : t("theme.dark")}
      title={isDark ? t("theme.light") : t("theme.dark")}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
};
