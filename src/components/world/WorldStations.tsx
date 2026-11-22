import { useEffect, useMemo } from "react";
import { MeshToonMaterial } from "three";
import { getToonGradient } from "@/lib/three/getToonGradient";
import { STATIONS } from "./const/worldLayout";
import { terrainHeight } from "./three/terrainHeight";

/** A round patch of packed dirt in front of each building: where Amaru stops to go in. Drawn just above the path. */
export function WorldStations() {
  const material = useMemo(
    () => new MeshToonMaterial({ color: "#e4c9a0", gradientMap: getToonGradient() }),
    []
  );
  useEffect(
    () => () => {
      material.dispose();
    },
    [material]
  );

  return (
    <>
      {/* Inicio is the plaza itself (drawn with the paths), so it gets no patch of its own. */}
      {STATIONS.slice(1).map(({ id, door: [x, z] }) => (
        <mesh key={id} position={[x, terrainHeight(x, z).height + 0.06, z]} rotation-x={-Math.PI / 2} material={material}>
          <circleGeometry args={[1.4, 24]} />
        </mesh>
      ))}
    </>
  );
}
