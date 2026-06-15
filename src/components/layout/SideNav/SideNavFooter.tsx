import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

export function SideNavFooter() {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.includes("es") ? "en" : "es");
  };

  return (
    <div className="side-nav-meta">
      <button onClick={toggleTheme} className="side-nav-meta-btn" aria-label="Toggle theme">
        {theme === "dark" ? <Sun size={14} /> : <MoonStar size={14} />}
      </button>
      <button onClick={toggleLang} className="side-nav-meta-btn" aria-label="Toggle language">
        <span className="text-[10px] font-bold font-mono leading-none">
          {i18n.language.includes("es") ? "EN" : "ES"}
        </span>
      </button>
    </div>
  );
}
