import { useTranslation } from "react-i18next";
import cvUrl from "@/assets/files/CV-LeticiaAranda-2025.pdf";

export function AboutBio() {
  const { t } = useTranslation();

  return (
    <>
      <p className="reveal max-w-[660px] text-center text-[15px] leading-[1.55] text-body">
        {t("about.description")}
      </p>
      <div className="reveal mb-1.5 flex flex-wrap justify-center gap-2.5">
        <a className="btn" href="#contact">
          {t("about.buttonPrimary")}
        </a>
        <a className="btn-ghost" href={cvUrl} target="_blank" rel="noopener noreferrer">
          {t("about.buttonSecondary")} ↗
        </a>
      </div>
    </>
  );
}
