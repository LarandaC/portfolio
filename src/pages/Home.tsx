import { lazy, Suspense } from "react";
import { use3DEnabled } from "@/hooks/use3DEnabled";
import { Index } from "./Index";

const MapExperience = lazy(() =>
  import("@/components/map/MapExperience").then((m) => ({ default: m.MapExperience }))
);

/** The map; the classic page without WebGL or with reduced motion. */
export const Home = () => {
  const mapEnabled = use3DEnabled();
  if (!mapEnabled) return <Index />;

  return (
    <Suspense fallback={null}>
      <MapExperience />
    </Suspense>
  );
};
