import { useTranslation } from "react-i18next";

export const useActiveLang = (): "en" | "es" => {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;
  return lang.startsWith("en") ? "en" : "es";
};
