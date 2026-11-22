import { useTranslation } from "react-i18next";
import { useMapStore } from "@/components/world/useMapStore";

/** Cover while the valley and Amaru load, with real download progress; fades away once he's on screen. */
export function MapLoader() {
  const { t } = useTranslation();
  const ready = useMapStore((s) => s.ready);
  const progress = useMapStore((s) => s.loadProgress);

  return (
    <div
      aria-hidden={ready}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-surface transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <p className="text-sm text-muted-ink">{t("map.loading")}</p>
      <div
        role="progressbar"
        aria-label={t("map.loading")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className="h-1.5 w-[min(240px,60vw)] overflow-hidden rounded-full bg-pill"
      >
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress, 4)}%` }}
        />
      </div>
      <p className="text-xs text-muted-ink tabular-nums" aria-hidden>
        {progress}%
      </p>
    </div>
  );
}
