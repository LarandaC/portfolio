import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Color, CylinderGeometry, IcosahedronGeometry, Matrix4, MeshToonMaterial, Quaternion, Vector3, type InstancedMesh } from "three";
import { getToonGradient } from "@/lib/three/getToonGradient";
import { scatterTrees } from "./three/scatterTrees";
import { isPhone } from "@/lib/isPhone";

const SAKURA = ["#f6c4d6", "#efa7c3", "#f9dbe6", "#e98fb3"].map((c) => new Color(c));
const GREEN = ["#7fae68", "#6a9a5a"].map((c) => new Color(c));
const TRUNK = new Color("#7a5a4a");

/** Two draw calls: trunks and canopies. */
export function WorldTrees({ sparse = false }: { sparse?: boolean }) {
  const trunks = useRef<InstancedMesh>(null);
  const canopies = useRef<InstancedMesh>(null);
  const spots = useMemo(() => scatterTrees(isPhone() ? 100 : 170, 42), []);
  // Low quality draws the first 45% (seeded scatter: a fair sample).
  const count = sparse ? Math.round(spots.length * 0.45) : spots.length;
  const { trunkGeometry, canopyGeometry, material } = useMemo(() => {
    const trunk = new CylinderGeometry(0.12, 0.2, 1.6, 6);
    trunk.translate(0, 0.8, 0);
    const canopy = new IcosahedronGeometry(1, 0);
    canopy.translate(0, 2.1, 0);
    return {
      trunkGeometry: trunk,
      canopyGeometry: canopy,
      material: new MeshToonMaterial({ gradientMap: getToonGradient() }),
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
      material.dispose();
    },
    [trunkGeometry, canopyGeometry, material]
  );

  return (
    <>
      <instancedMesh ref={trunks} args={[trunkGeometry, material, spots.length]} count={count} />
      <instancedMesh ref={canopies} args={[canopyGeometry, material, spots.length]} count={count} />
    </>
  );
}
