import { useTranslation } from "react-i18next";

export function AboutHeader() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-mono text-xs tracking-[0.32em] uppercase mb-3 about-label">
        01 · {t("about.title")}
      </p>
      <h2 className="font-family-display font-bold leading-tight mb-2 about-title">
        {t("about.title")}
      </h2>
      <div className="mb-14 about-title-line" />
    </>
  );
}
