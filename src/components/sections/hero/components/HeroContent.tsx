import { useTranslation } from "react-i18next";
import { cvUrl } from "@/lib/cv";
import { SplitWords } from "@/components/shared/SplitWords";

export function HeroContent() {
  const { t } = useTranslation();

  return (
    <div className="hero-content absolute inset-x-0 top-[17%] z-6 flex flex-col items-center gap-[18px] px-4 text-center max-tablet:top-[13%] max-tablet:gap-3.5">
      <span className="pill hero-fade">{t("hero.role")}</span>

      <h1
        id="heroTitle"
        className="split text-[clamp(36px,5vw,76px)] leading-[1.04] font-normal tracking-[-.045em]"
      >
        <SplitWords text="Leticia Aranda" />
        <br />
        <em className="font-medium text-brand italic">
          <SplitWords text={t("hero.tagline")} />
        </em>
      </h1>

      <p className="hero-fade max-w-[500px] text-[clamp(14px,1.1vw,16px)] leading-normal text-nav">
        {t("hero.intro")}
      </p>

      <div className="hero-fade flex flex-wrap justify-center gap-2.5">
        <a className="btn" href="#projects">
          {t("hero.button")} <span aria-hidden>→</span>
        </a>
        <a className="btn-ghost" href={cvUrl} target="_blank" rel="noopener noreferrer">
          {t("about.buttonSecondary")} ↗
        </a>
      </div>
    </div>
  );
}
