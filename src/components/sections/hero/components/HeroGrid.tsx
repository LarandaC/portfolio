import type { RefObject } from "react";

interface HeroGridProps {
  gridRef: RefObject<HTMLDivElement>;
}

export function HeroGrid({ gridRef }: HeroGridProps) {
  return (
    <div
      ref={gridRef}
      className="absolute bottom-0 left-0 right-0 pointer-events-none hero-grid"
    >
      <div className="hero-grid-horizon" />
      <div className="hero-grid-lines" />
    </div>
  );
}
