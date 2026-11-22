import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type GlassSquareProps = {
  className?: string;
  /** Position and size (left/top in %, width…). */
  style?: CSSProperties;
};

/**
 * A frosted-glass square floating over an image (hero video, project clouds).
 * Keeps the `glass` class as a GSAP hook: the hero's flicker and intro animate `.glass`.
 */
export function GlassSquare({ className, style }: GlassSquareProps) {
  return (
    <span
      className={cn(
        "glass absolute rounded-xl border border-white/55 bg-white/16 shadow-[inset_0_1px_0_rgba(255,255,255,.4)] backdrop-blur-[10px] backdrop-saturate-[1.2]",
        className
      )}
      style={style}
    />
  );
}
