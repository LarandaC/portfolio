import type { RefObject } from "react";
import { useTranslation } from "react-i18next";

interface HeroContentProps {
  contentRef: RefObject<HTMLDivElement>;
}

export function HeroContent({ contentRef }: HeroContentProps) {
  const { t } = useTranslation();

  return (
    <div
      ref={contentRef}
      className="relative z-10 flex flex-col items-center text-center px-6 select-none will-change-transform"
    >
      <p className="text-xs font-mono tracking-[0.38em] uppercase mb-10 hero-overline">
        DESARROLLADORA FULL STACK
      </p>

      <h1 className="font-family-display font-bold hero-name hero-name-solid">
        LETICIA
      </h1>

      <h1 className="font-family-display font-bold hero-name hero-name-outline">
        ARANDA
      </h1>

      <div className="flex items-center gap-3 my-7 hero-separator">
        <div className="h-px w-20 hero-separator-line-r" />
        <span className="text-xs font-mono hero-separator-gem">✦</span>
        <div className="h-px w-20 hero-separator-line-l" />
      </div>

      <p className="text-xs font-mono tracking-[0.22em] hero-stack">
        NEXT · TYPESCRIPT · NODE.JS
      </p>

      <a
        href="#projects"
        className="mt-10 inline-flex items-center gap-3 text-xs font-mono tracking-[0.22em] uppercase hero-cta"
      >
        {t("hero.button")}
        <span className="tracking-normal">→</span>
      </a>
    </div>
  );
}
