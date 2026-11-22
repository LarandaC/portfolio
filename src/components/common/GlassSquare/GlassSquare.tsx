import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type GlassSquareProps = {
  className?: string;
  style?: CSSProperties;
};

/** Keeps the `glass` class: GSAP animates `.glass`. */
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
