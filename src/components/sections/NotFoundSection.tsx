import { useTranslation } from "react-i18next";
import { CLOUD_A, CLOUD_B, TREE } from "@/lib/media";
import { DriftCloud } from "@/components/shared/DriftCloud";
import { Petals } from "@/components/shared/Petals";
import { CLOUD_LEFT, CLOUD_RIGHT } from "@/components/shared/cloudPositions";

export const NotFoundSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center gap-[22px] overflow-hidden bg-surface px-4 pt-[100px] pb-[280px] text-center">
      <DriftCloud src={CLOUD_A} className={CLOUD_LEFT} />
      <DriftCloud src={CLOUD_B} className={CLOUD_RIGHT} drift="b" />
      <Petals />

      <div
        className="absolute inset-x-0 -bottom-[4%] z-2 mx-auto w-[min(230px,44vw)]"
        aria-hidden
      >
        <img className="w-full" src={TREE} alt="" />
      </div>

      <div className="relative z-4 flex flex-col items-center gap-5">
        <span className="pill">ERR · 404</span>
        <span
          className="text-[clamp(110px,18vw,220px)] leading-[.8] font-semibold tracking-[-.07em] text-brand"
          aria-hidden
        >
          404
        </span>
        <h1 className="max-w-[640px] text-[clamp(24px,3vw,40px)] leading-[1.12] font-normal tracking-[-.03em]">
          {t("404.title")}
        </h1>
        <p className="max-w-[460px] text-[15px] leading-normal text-muted-ink">{t("404.description")}</p>
        <a href="/" className="btn">
          {t("404.button")}
        </a>
      </div>
    </section>
  );
};
