import { useTranslation } from "react-i18next";

export function ExperienceHeader() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-mono text-xs tracking-[0.32em] uppercase mb-3 experience-label">
        02 · {t("experience.title")}
      </p>
      <h2 className="font-family-display font-bold leading-tight mb-2 experience-title">
        {t("experience.title")}
      </h2>
      <div className="mb-14 experience-title-line" />
    </>
  );
}
