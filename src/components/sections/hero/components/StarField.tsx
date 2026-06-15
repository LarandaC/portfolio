import type { RefObject } from "react";
import { STARS_FAR, STARS_MID, STARS_NEAR } from "../const/constants";
import { StarLayer } from "./StarLayer";

interface StarFieldProps {
  farRef: RefObject<HTMLDivElement>;
  midRef: RefObject<HTMLDivElement>;
  nearRef: RefObject<HTMLDivElement>;
}

export function StarField({ farRef, midRef, nearRef }: StarFieldProps) {
  return (
    <>
      <StarLayer stars={STARS_FAR} layerRef={farRef} opacityFactor={0.45} />
      <StarLayer
        stars={STARS_MID}
        layerRef={midRef}
        opacityFactor={0.7}
        glowStyle="0 0 4px 1px rgba(255,255,255,0.22)"
      />
      <StarLayer
        stars={STARS_NEAR}
        layerRef={nearRef}
        opacityFactor={1}
        glowStyle="0 0 8px 2px rgba(255,255,255,0.32)"
      />
    </>
  );
}
