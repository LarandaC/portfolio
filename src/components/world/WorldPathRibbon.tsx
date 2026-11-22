import { useEffect, useMemo } from "react";
import { BufferAttribute, BufferGeometry, MeshToonMaterial, Vector3 } from "three";
import { createToonGradient } from "@/components/shared/three/three/createToonGradient";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PLAZA } from "./const/worldLayout";
import { getWorldPath } from "./three/getWorldPath";
import { terrainHeight } from "./three/terrainHeight";

const WIDTH = 2;
const UP = new Vector3(0, 1, 0);

/** A strip of mesh along `samples`, draped on the ground. */
function strip(samples: Vector3[]) {
  const positions = new Float32Array(samples.length * 2 * 3);
  const side = new Vector3();
  const tangent = new Vector3();
  samples.forEach((p, i) => {
    const next = samples[Math.min(i + 1, samples.length - 1)];
    const prev = samples[Math.max(i - 1, 0)];
    tangent.subVectors(next, prev).setY(0).normalize();
    side.crossVectors(tangent, UP).multiplyScalar(WIDTH / 2);
    for (const [k, sign] of [[0, 1], [1, -1]] as const) {
      const x = p.x + side.x * sign;
      const z = p.z + side.z * sign;
      positions.set([x, terrainHeight(x, z).height + 0.04, z], (i * 2 + k) * 3);
    }
  });
  const index: number[] = [];
  for (let i = 0; i < samples.length - 1; i++) {
    const a = i * 2;
    index.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(positions, 3));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

/** The dirt paths (one per place) and the plaza as their own meshes on the ground: crisp edges, unlike painting the terrain. */
export function WorldPathRibbon() {
  const geometry = useMemo(() => mergeGeometries(getWorldPath().spokes.map((s) => strip(s.points))), []);
  const plaza = useMemo(() => terrainHeight(PLAZA[0], PLAZA[1]).height, []);

  const material = useMemo(
    () => new MeshToonMaterial({ color: "#d9b88c", gradientMap: createToonGradient(), polygonOffset: true, polygonOffsetFactor: -2 }),
    []
  );

  useEffect(
    () => () => {
      geometry?.dispose();
      material.gradientMap?.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  return (
    <>
      <mesh geometry={geometry} material={material} />
      <mesh position={[PLAZA[0], plaza + 0.05, PLAZA[1]]} rotation-x={-Math.PI / 2} material={material}>
        <circleGeometry args={[4.2, 40]} />
      </mesh>
    </>
  );
}
