import { lazy, Suspense } from "react";
import { useMapEnabled } from "@/hooks/useMapEnabled";
import { Index } from "./Index";

const MapExperience = lazy(() =>
  import("@/components/map/MapExperience").then((m) => ({ default: m.MapExperience }))
);

/**
 * The home page is the explorable map. Without WebGL, or with reduced motion,
 * it's the classic scrolling portfolio (always available at /simple too).
 */
export const Home = () => {
  const mapEnabled = useMapEnabled();
  if (!mapEnabled) return <Index />;

  return (
    <Suspense fallback={null}>
      <MapExperience />
    </Suspense>
  );
};
