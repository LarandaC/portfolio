import { TranslateSharp } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.includes("es") ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative overflow-hidden px-4 py-2 rounded-full font-medium 
                 text-sm border border-border bg-card/50 backdrop-blur-sm
                 hover:bg-primary/10 transition-all duration-300 cursor-pointer"
    >
      <span className="relative z-10 flex items-center gap-2">
        <TranslateSharp fontSize="small" />
        {i18n.language.includes("es") ? "EN" : "ES"}
      </span>
    </button>
  );
};
