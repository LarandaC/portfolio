import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Color, CylinderGeometry, IcosahedronGeometry, Matrix4, MeshToonMaterial, Quaternion, Vector3, type InstancedMesh } from "three";
import { createToonGradient } from "@/components/shared/three/three/createToonGradient";
import { scatterTrees } from "./three/scatterTrees";

/** Canopy colors: cherry pinks, and a few plain greens so the blossoms stand out. */
const SAKURA = ["#f6c4d6", "#efa7c3", "#f9dbe6", "#e98fb3"].map((c) => new Color(c));
const GREEN = ["#7fae68", "#6a9a5a"].map((c) => new Color(c));
const TRUNK = new Color("#7a5a4a");

/** Low-poly trees in two draw calls (trunks + canopies), scattered once around the valley. */
export function WorldTrees() {
  const trunks = useRef<InstancedMesh>(null);
  const canopies = useRef<InstancedMesh>(null);
  const spots = useMemo(() => scatterTrees(window.innerWidth <= 760 ? 100 : 170, 42), []);
  const { trunkGeometry, canopyGeometry, material } = useMemo(() => {
    const trunk = new CylinderGeometry(0.12, 0.2, 1.6, 6);
    trunk.translate(0, 0.8, 0);
    const canopy = new IcosahedronGeometry(1, 0);
    canopy.translate(0, 2.1, 0);
    return {
      trunkGeometry: trunk,
      canopyGeometry: canopy,
      material: new MeshToonMaterial({ gradientMap: createToonGradient() }),
    };
  }, []);

  useLayoutEffect(() => {
    const matrix = new Matrix4();
    const rotation = new Quaternion();
    const up = new Vector3(0, 1, 0);
    const scale = new Vector3();
    const position = new Vector3();

    spots.forEach((spot, i) => {
      rotation.setFromAxisAngle(up, spot.rotation);
      position.set(spot.x, spot.y - 0.1, spot.z);
      scale.setScalar(spot.scale);
      matrix.compose(position, rotation, scale);
      trunks.current?.setMatrixAt(i, matrix);
      trunks.current?.setColorAt(i, TRUNK);

      // Canopies a bit wider than tall for the round cherry silhouette.
      scale.set(spot.scale * 1.25, spot.scale * 1.05, spot.scale * 1.25);
      matrix.compose(position, rotation, scale);
      canopies.current?.setMatrixAt(i, matrix);
      const palette = spot.sakura ? SAKURA : GREEN;
      canopies.current?.setColorAt(i, palette[i % palette.length]);
    });
    for (const mesh of [trunks.current, canopies.current]) {
      if (!mesh) continue;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  }, [spots]);

  useEffect(
    () => () => {
      trunkGeometry.dispose();
      canopyGeometry.dispose();
      material.gradientMap?.dispose();
      material.dispose();
    },
    [trunkGeometry, canopyGeometry, material]
  );

  return (
    <>
      <instancedMesh ref={trunks} args={[trunkGeometry, material, spots.length]} />
      <instancedMesh ref={canopies} args={[canopyGeometry, material, spots.length]} />
    </>
  );
}
