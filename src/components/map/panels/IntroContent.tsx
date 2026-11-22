import { useTranslation } from "react-i18next";
import { cvUrl } from "@/lib/cv";
import { mapStore } from "@/components/world/mapStore";
import { Button } from "@/components/common/Button";
import { Pill } from "@/components/common/Pill";

/** Welcome card (the old hero): name, role, tagline, intro and the way into the valley. */
export function IntroContent() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start gap-4">
      <Pill>{t("hero.role")}</Pill>
      <h1 className="text-[clamp(34px,4vw,52px)] leading-[1.04] font-normal tracking-[-.045em] text-ink">
        Leticia Aranda
        <br />
        <em className="font-medium text-brand italic">{t("hero.tagline")}</em>
      </h1>
      <p className="max-w-[420px] text-[15px] leading-normal text-body">{t("hero.intro")}</p>
      <p className="max-w-[420px] text-sm leading-normal text-muted-ink">{t("map.guide")}</p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        <Button onClick={() => mapStore.set({ introOpen: false })}>
          {t("map.explore")}
        </Button>
        <Button variant="ghost" onClick={() => mapStore.goTo("projects")}>
          {t("hero.button")}
        </Button>
        <Button variant="ghost" href={cvUrl} external>
          {t("about.buttonSecondary")}
        </Button>
      </div>
    </div>
  );
}
