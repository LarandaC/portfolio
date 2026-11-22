import { lazy, Suspense, useMemo, useRef, useState, type ComponentType, type LazyExoticComponent } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCssColors } from "@/hooks/useCssColors";
import { Petals } from "@/components/common/Petals";
import { hasWebGL } from "@/lib/three/hasWebGL";
import type { SceneProps } from "./three/types";

const DefaultScene = lazy(() => import("./PetalScene"));

type PetalLayerProps = {
  /** Petal count on desktop; phones get about 40% of it. */
  count?: number;
  /** Stacking within the section, e.g. "z-4". */
  className?: string;
  /** A lazily loaded scene to render instead of the plain petal swarm (e.g. the hero's depth scene). */
  scene?: LazyExoticComponent<ComponentType<SceneProps>>;
};

/**
 * Decorative 3D layer for a section. Falls back to the CSS petals
 * without WebGL or with reduced motion (where they stay still).
 */
export function PetalLayer({ count = 160, className, scene: Scene = DefaultScene }: PetalLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reducedMotion = useReducedMotion();
  const resolved = useCssColors(ref, ["petal", "blossom", "brand-soft", "surface"]);
  const colors = useMemo(
    () => resolved && { petal: resolved[0], blossom: resolved[1], lavender: resolved[2], mist: resolved[3] },
    [resolved]
  );
  const [finalCount] = useState(() => (window.innerWidth <= 760 ? Math.round(count * 0.4) : count));
  const use3D = hasWebGL() && !reducedMotion;

  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {!use3D ? (
        <Petals />
      ) : (
        colors && (
          <Suspense fallback={null}>
            <Scene count={finalCount} colors={colors} active={inView} />
          </Suspense>
        )
      )}
    </div>
  );
}
