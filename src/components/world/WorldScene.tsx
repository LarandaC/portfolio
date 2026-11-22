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
import { Amaru } from "./Amaru";

/** The map in one canvas: lazily loaded, so three.js stays out of the main chunk. */
export function WorldScene() {
  const phone = window.innerWidth <= 760;
  return (
    <Canvas
      dpr={phone ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [30, 30, 40], fov: 32, near: 0.5, far: 900 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <MapController />
      <MapCamera />
      <WorldAtmosphere />
      <WorldTerrain />
      <WorldWater />
      <WorldTrees />
      <WorldPathRibbon />
      <WorldStations />
      <Suspense fallback={null}>
        <MapBuildings />
        <MapDecor />
        <Amaru />
      </Suspense>
    </Canvas>
  );
}

export default WorldScene;
