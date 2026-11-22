import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { MapController } from "./MapController";
import { MapCamera } from "./MapCamera";
import { WorldAtmosphere } from "./WorldAtmosphere";
import { WorldTerrain } from "./WorldTerrain";
import { WorldWater } from "./WorldWater";
import { WorldTrees } from "./WorldTrees";
import { WorldStations } from "./WorldStations";
import { WorldPathRibbon } from "./WorldPathRibbon";
import { MapBuildings } from "./MapBuildings";
import { MapDecor } from "./MapDecor";
import { Signposts } from "./Signposts";
import { Amaru } from "./Amaru";
import { LanternGlows } from "./LanternGlows";
import { WorldStars } from "./WorldStars";
import { Fireflies } from "./Fireflies";
import { MapPetals } from "./MapPetals";
import { WatercolorPass } from "./WatercolorPass";
import { PerformanceGuard } from "./PerformanceGuard";
import { LoadProgressReporter } from "./LoadProgressReporter";
import { useMapStore } from "./useMapStore";

type WorldSceneProps = {
  /** The browser dropped the WebGL context (e.g. a phone short on memory): the map can't continue. */
  onContextLost?: () => void;
};

/** The map in one canvas: lazily loaded, so three.js stays out of the main chunk. */
export function WorldScene({ onContextLost }: WorldSceneProps) {
  const phone = window.innerWidth <= 760;
  // Drops to "low" if the device can't keep up (PerformanceGuard): the heavy extras go, the map stays.
  const low = useMapStore((s) => s.quality === "low");
  return (
    <Canvas
      onCreated={({ gl }) => {
        if (onContextLost) gl.domElement.addEventListener("webglcontextlost", onContextLost, { once: true });
      }}
      dpr={phone ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [30, 30, 40], fov: 32, near: 0.5, far: 900 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <MapController />
      <LoadProgressReporter />
      <PerformanceGuard />
      {!low && <WatercolorPass />}
      <MapCamera />
      <WorldAtmosphere />
      <WorldStars />
      <WorldTerrain />
      <WorldWater />
      <WorldTrees sparse={low} />
      <WorldPathRibbon />
      <WorldStations />
      <Signposts />
      <LanternGlows />
      {!low && <Fireflies />}
      {!low && <MapPetals />}
      <Suspense fallback={null}>
        <MapBuildings />
        <MapDecor />
        <Amaru />
      </Suspense>
    </Canvas>
  );
}

export default WorldScene;
