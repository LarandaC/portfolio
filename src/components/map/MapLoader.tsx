import { useTranslation } from "react-i18next";
import { useMapStore } from "@/components/world/useMapStore";

/** Soft cover while the valley and Amaru load; fades away once he's on screen. */
export function MapLoader() {
  const { t } = useTranslation();
  const ready = useMapStore((s) => s.ready);

  return (
    <div
      aria-hidden={ready}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-surface transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <p className="animate-pulse text-sm text-muted-ink" role="status">
        {t("map.loading")}
      </p>
    </div>
  );
}
