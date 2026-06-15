import type { CSSProperties, RefObject } from "react";
import type { StarDatum } from "../const/constants";

export interface StarLayerProps {
  stars:         StarDatum[];
  layerRef:      RefObject<HTMLDivElement>;
  opacityFactor: number;
  glowStyle?:    string;
}

export function StarLayer({ stars, layerRef, opacityFactor, glowStyle }: StarLayerProps) {
  return (
    <div ref={layerRef} className="absolute inset-0 pointer-events-none star-layer">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star-dot"
          style={{
            "--star-top":     s.top,
            "--star-left":    s.left,
            "--star-size":    `${s.size}px`,
            "--star-opacity": s.opacity * opacityFactor,
            "--star-glow":    s.glow ? glowStyle : "none",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
