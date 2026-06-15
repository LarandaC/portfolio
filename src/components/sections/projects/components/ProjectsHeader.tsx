import { useTranslation } from "react-i18next";

export function ProjectsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-mono text-xs tracking-[0.32em] uppercase mb-3 projects-label">
        03 · {t("projects.title")}
      </p>
      <h2 className="font-family-display font-bold leading-tight mb-2 projects-title">
        {t("projects.title")}
      </h2>
      <div className="mb-5 projects-title-line" />
      <p className="text-sm max-w-xl mb-14 leading-relaxed projects-desc">
        {t("projects.description")}
      </p>
    </>
  );
}
