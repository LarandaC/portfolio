import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importa tus archivos JSON
import esTranslations from "../src/language/es.json";
import enTranslations from "../src/language/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations },
    },
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
