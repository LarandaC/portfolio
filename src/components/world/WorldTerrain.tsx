import { useEffect, useMemo } from "react";
import { MeshToonMaterial } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { mapStore } from "./mapStore";
import { createToonGradient } from "@/lib/three/createToonGradient";
import { createTerrainGeometry } from "./three/createTerrainGeometry";

/** The valley ground, flat-shaded in three toon bands. Click it to walk Amaru there. Fewer vertices on phones. */
export function WorldTerrain() {
  const geometry = useMemo(() => createTerrainGeometry(window.innerWidth <= 760 ? 100 : 150), []);
  const material = useMemo(
    () => new MeshToonMaterial({ vertexColors: true, gradientMap: createToonGradient() }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.gradientMap?.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  const walkHere = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    mapStore.goToPoint(e.point.x, e.point.z);
  };

  return <mesh geometry={geometry} material={material} onClick={walkHere} />;
}
