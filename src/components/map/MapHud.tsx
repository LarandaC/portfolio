import { Maximize2, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { STATIONS } from "@/components/world/const/worldLayout";
import { mapStore, ZOOM } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { CreditsDialog } from "@/components/shared/CreditsDialog";

/** Everything around the map: name, places menu, theme/language, simple version, controls and zoom. */
export function MapHud() {
  const { t } = useTranslation();
  const current = useMapStore((s) => s.panel ?? s.nearby);
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const introOpen = useMapStore((s) => s.introOpen);

  return (
    <>
      <nav
        aria-label={t("map.menu")}
        className="fixed inset-x-0 top-[18px] z-40 mx-auto flex w-max max-w-[calc(100%-28px)] items-center gap-4 rounded-full bg-surface/90 py-[5px] pr-[5px] pl-4 shadow-nav backdrop-blur-[8px] max-tablet:top-3 max-tablet:gap-2 max-tablet:pl-2"
      >
        <button
          type="button"
          onClick={() => mapStore.goTo("inicio")}
          className="flex items-center gap-1.5 text-[19px] font-medium tracking-[-.04em] whitespace-nowrap text-ink max-tablet:hidden"
        >
          <BrandLogo />
          Leticia Aranda
        </button>
        <div className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none] max-tablet:max-w-[58vw]">
          {STATIONS.slice(1).map(({ id, labelKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => mapStore.goTo(id)}
              aria-current={current === id ? "location" : undefined}
              className={`rounded-full px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${current === id ? "bg-pill text-pill-ink" : "text-nav hover:bg-mist"}`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSelector />
        </div>
      </nav>

      <div className={`fixed bottom-4 left-4 z-20 flex flex-col items-start gap-2 max-tablet:hidden ${introOpen ? "invisible" : ""}`}>
        <p className="rounded-full bg-surface/85 px-3 py-1.5 text-xs text-body shadow-nav backdrop-blur-[6px]">
          {touch ? t("map.controlsTouch") : t("map.controls")}
        </p>
        <div className="flex gap-2">
          <Link to="/simple" className="rounded-full bg-surface/85 px-3 py-1.5 text-xs text-body underline shadow-nav backdrop-blur-[6px]">
            {t("map.simple")}
          </Link>
          <CreditsDialog className="cursor-pointer rounded-full bg-surface/85 px-3 py-1.5 text-xs text-body underline shadow-nav backdrop-blur-[6px]" />
        </div>
      </div>

      <div className="fixed right-4 bottom-4 z-20 flex flex-col gap-1.5 max-tablet:top-20 max-tablet:right-3 max-tablet:bottom-auto">
        <button type="button" className="icon-btn bg-surface/90 shadow-nav" onClick={() => mapStore.zoomBy(1 / 1.3)} aria-label={t("map.zoomIn")}>
          <Plus className="size-4" />
        </button>
        <button type="button" className="icon-btn bg-surface/90 shadow-nav" onClick={() => mapStore.zoomBy(1.3)} aria-label={t("map.zoomOut")}>
          <Minus className="size-4" />
        </button>
        <button type="button" className="icon-btn bg-surface/90 shadow-nav" onClick={() => mapStore.set({ zoom: ZOOM.overview })} aria-label={t("map.overview")}>
          <Maximize2 className="size-4" />
        </button>
      </div>
    </>
  );
}
