import { Maximize2, Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { STATIONS } from "@/components/world/const/worldLayout";
import { mapStore, ZOOM } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { CreditsDialog } from "@/components/common/CreditsDialog";
import { Button } from "@/components/common/Button";

/**
 * Everything around the map: controls hint, simple version and credits (bottom left),
 * zoom, theme and language (bottom right). The places are reached on the map itself; a menu of them
 * stays available to keyboard and screen-reader users, appearing only when it gets focus.
 */
export function MapHud() {
  const { t } = useTranslation();
  const current = useMapStore((s) => s.panel ?? s.nearby);
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const introOpen = useMapStore((s) => s.introOpen);

  return (
    <>
      {/* The map and its labels are hidden from assistive tech, so this is their way to each place. */}
      <nav
        aria-label={t("map.menu")}
        className="sr-only fixed top-4 left-1/2 z-40 flex -translate-x-1/2 gap-0.5 rounded-full bg-surface/95 p-[5px] shadow-nav focus-within:not-sr-only"
      >
        {STATIONS.map(({ id, labelKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => mapStore.goTo(id)}
            aria-current={current === id ? "location" : undefined}
            className="rounded-full px-3 py-1.5 text-sm whitespace-nowrap text-nav hover:bg-mist"
          >
            {t(labelKey)}
          </button>
        ))}
      </nav>

      <div className={`fixed bottom-4 left-4 z-20 flex flex-col items-start gap-2 max-tablet:hidden ${introOpen ? "invisible" : ""}`}>
        <p className="rounded-full bg-surface/85 px-3 py-1.5 text-xs text-body shadow-nav backdrop-blur-[6px]">
          {touch ? t("map.controlsTouch") : t("map.controls")}
        </p>
        <div className="flex gap-2">
          <Button variant="chip" to="/simple">
            {t("map.simple")}
          </Button>
          <CreditsDialog variant="chip" />
        </div>
      </div>

      {/* Zoom: above theme/language on desktop; top right on phones, where the bottom belongs to the cards. */}
      <div className="fixed right-4 bottom-[72px] z-20 flex flex-col gap-1.5 max-tablet:top-4 max-tablet:right-3 max-tablet:bottom-auto">
        <Button variant="icon" className="bg-surface/90 shadow-nav" onClick={() => mapStore.zoomBy(1 / 1.3)} aria-label={t("map.zoomIn")}>
          <Plus className="size-4" />
        </Button>
        <Button variant="icon" className="bg-surface/90 shadow-nav" onClick={() => mapStore.zoomBy(1.3)} aria-label={t("map.zoomOut")}>
          <Minus className="size-4" />
        </Button>
        <Button variant="icon" className="bg-surface/90 shadow-nav" onClick={() => mapStore.set({ zoom: ZOOM.overview })} aria-label={t("map.overview")}>
          <Maximize2 className="size-4" />
        </Button>
      </div>

      <div className="fixed right-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full bg-surface/90 p-[5px] shadow-nav backdrop-blur-[8px] max-tablet:right-3">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </>
  );
}
