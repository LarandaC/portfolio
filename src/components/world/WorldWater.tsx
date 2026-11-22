import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshToonMaterial } from "three";
import { createToonGradient } from "@/components/shared/three/three/createToonGradient";
import { TERRAIN_SIZE, WATER_LEVEL } from "./const/worldLayout";
import { createTimeOfDay, sampleTimeOfDay } from "./three/timeOfDay";
import { worldRuntime } from "./three/worldRuntime";

/** One flat water sheet at water level: the terrain hides it except in the lake and the river. */
export function WorldWater() {
  const tod = useMemo(createTimeOfDay, []);
  const material = useMemo(() => new MeshToonMaterial({ gradientMap: createToonGradient() }), []);

  useEffect(
    () => () => {
      material.gradientMap?.dispose();
      material.dispose();
    },
    [material]
  );

  useFrame(() => {
    sampleTimeOfDay(worldRuntime.timeOfDay, tod);
    material.color.copy(tod.water);
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={WATER_LEVEL} material={material}>
      <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE]} />
    </mesh>
  );
}
