import { Html } from "@react-three/drei";
import { useTranslation } from "react-i18next";
import type { StationId } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { useMapStore } from "./useMapStore";
import { Pill } from "@/components/common/Pill";

type StationLabelProps = {
  id: StationId;
  labelKey: string;
  position: [number, number, number];
};

/** Clicking sends Amaru there; highlighted while he's at the door. */
export function StationLabel({ id, labelKey, position }: StationLabelProps) {
  const { t } = useTranslation();
  const here = useMapStore((s) => s.nearby === id || s.panel === id);

  return (
    <Html position={position} center zIndexRange={[20, 0]}>
      {/* stopPropagation: the label lives inside the canvas' container, so without it the same click
          also reaches the scene as a click on the ground behind it and sends Amaru there instead. */}
      <Pill
        tone={here ? "active" : "default"}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          mapStore.goTo(id);
        }}
        className="whitespace-nowrap shadow-nav transition-transform hover:scale-105"
      >
        {t(labelKey)}
      </Pill>
    </Html>
  );
}
