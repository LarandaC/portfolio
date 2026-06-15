import { useTranslation } from "react-i18next";

export function AboutBio() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <p className="text-lg leading-relaxed about-bio-text">
        {t("about.description")}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 about-contact-btn"
        >
          {t("about.buttonPrimary")}
        </a>
        <a
          href="/files/CV-LeticiaAranda-2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 about-cv-link"
        >
          {t("about.buttonSecondary")} ↗
        </a>
      </div>
    </div>
  );
}
