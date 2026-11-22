import { useTranslation } from "react-i18next";
import { STATIONS } from "@/components/world/const/worldLayout";
import { mapStore } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { Button } from "@/components/common/Button";

/** "Enter Proyectos (Enter)" when Amaru stands at a door with nothing open. */
export function MapEnterPrompt() {
  const { t } = useTranslation();
  const nearby = useMapStore((s) => (s.panel || s.introOpen ? null : s.nearby));
  if (!nearby) return null;
  const station = STATIONS.find((s) => s.id === nearby)!;

  return (
    <Button
      onClick={() => mapStore.set({ panel: nearby })}
      className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 shadow-nav max-tablet:bottom-[84px]"
    >
      {t("map.enter", { place: t(station.labelKey) })}
      <kbd className="ml-2 rounded-md bg-on-brand/20 px-1.5 py-0.5 text-[11px] max-tablet:hidden">{t("map.enterHint")}</kbd>
    </Button>
  );
}
