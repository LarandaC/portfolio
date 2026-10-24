import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const isEs = i18n.language.includes("es");

  return (
    <button
      onClick={() => i18n.changeLanguage(isEs ? "en" : "es")}
      className={`inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-3 text-xs font-semibold transition-colors duration-[250ms] hover:border-brand-soft ${className}`}
      aria-label={isEs ? "Switch to English" : "Cambiar a español"}
    >
      <Languages size={14} />
      {isEs ? "EN" : "ES"}
    </button>
  );
};
