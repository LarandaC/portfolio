import { useTranslation } from "react-i18next";
import { cvUrl } from "@/lib/cv";
import { SplitWords } from "@/components/shared/SplitWords";

/** Sits bottom-right, over the darker foreground of the video, so it uses light text. */
export function HeroContent() {
  const { t } = useTranslation();

  return (
    <div className="hero-content absolute right-[6vw] bottom-[11vh] z-6 flex max-w-[min(600px,calc(100%-32px))] flex-col items-end gap-[18px] text-right max-tablet:right-4 max-tablet:bottom-[9vh] max-tablet:gap-3.5">
      <span className="pill hero-fade">{t("hero.role")}</span>

      <h1
        id="heroTitle"
        className="split text-[clamp(36px,4.6vw,68px)] leading-[1.04] font-normal tracking-[-.045em] text-white [text-shadow:0_2px_24px_color-mix(in_srgb,var(--color-scrim)_45%,transparent)]"
      >
        <SplitWords text="Leticia Aranda" />
        <br />
        <em className="font-medium text-brand-soft italic">
          <SplitWords text={t("hero.tagline")} />
        </em>
      </h1>

      <p className="hero-fade max-w-[460px] text-[clamp(14px,1.1vw,16px)] leading-normal text-white/85 [text-shadow:0_1px_12px_color-mix(in_srgb,var(--color-scrim)_50%,transparent)]">
        {t("hero.intro")}
      </p>

      <div className="hero-fade flex flex-wrap justify-end gap-2.5">
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
