import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mapStore } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { Button } from "@/components/common/Button";

/** Shown when the map stays slow even at low quality: offers the simple version, never forces it. */
export function MapSlowNotice() {
  const { t } = useTranslation();
  const show = useMapStore((s) => s.slowNotice);
  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed top-4 left-1/2 z-40 flex w-max max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-3 rounded-full bg-surface/95 py-1.5 pr-1.5 pl-4 text-sm text-body shadow-nav backdrop-blur-[8px] max-tablet:top-auto max-tablet:bottom-[132px]"
    >
      <span>{t("map.slow")}</span>
      <Button to="/simple" className="h-8 px-3">
        {t("map.simple")}
      </Button>
      <Button variant="icon" className="size-8" onClick={() => mapStore.set({ slowNotice: false })} aria-label={t("map.close")}>
        <X className="size-4" />
      </Button>
    </div>
  );
}
