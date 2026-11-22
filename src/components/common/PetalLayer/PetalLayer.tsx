import { lazy, Suspense, useRef, useState, type ComponentType, type LazyExoticComponent } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { use3DEnabled } from "@/hooks/use3DEnabled";
import { useCssColors } from "@/hooks/useCssColors";
import { Petals } from "@/components/common/Petals";
import type { SceneProps } from "./three/types";
import { isPhone } from "@/lib/isPhone";

const PETAL_TOKENS = { petal: "petal", blossom: "blossom", lavender: "brand-soft" };

const DefaultScene = lazy(() => import("./PetalScene"));

type PetalLayerProps = {
  /** Desktop count; phones get ~40%. */
  count?: number;
  className?: string;
  /** Lazy scene to render instead of the plain swarm. */
  scene?: LazyExoticComponent<ComponentType<SceneProps>>;
};

/** 3D petals; CSS petals without WebGL or with reduced motion. */
export function PetalLayer({ count = 160, className, scene: Scene = DefaultScene }: PetalLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const colors = useCssColors(ref, PETAL_TOKENS);
  const [finalCount] = useState(() => (isPhone() ? Math.round(count * 0.4) : count));
  const use3D = use3DEnabled();

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
