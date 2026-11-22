import { useEffect, useMemo } from "react";
import { MeshToonMaterial } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { mapStore } from "./mapStore";
import { getToonGradient } from "@/lib/three/getToonGradient";
import { createTerrainGeometry } from "./three/createTerrainGeometry";
import { isPhone } from "@/lib/isPhone";

/** The valley ground, flat-shaded in three toon bands. Click it to walk Amaru there. Fewer vertices on phones. */
export function WorldTerrain() {
  const geometry = useMemo(() => createTerrainGeometry(isPhone() ? 100 : 150), []);
  const material = useMemo(
    () => new MeshToonMaterial({ vertexColors: true, gradientMap: getToonGradient() }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
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
