import { Box3, Mesh, SkinnedMesh, Vector3, type Object3D } from "three";

export type ModelStats = {
  triangles: number;
  meshes: number;
  skinned: boolean;
  /** Real size in scene units (before the lab scales it to fit the view). */
  size: { width: number; height: number; depth: number };
};

/** Triangle count, mesh count, rig presence and real dimensions of a loaded model. */
export function getModelStats(root: Object3D): ModelStats {
  let triangles = 0;
  let meshes = 0;
  let skinned = false;

  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    meshes++;
    if (object instanceof SkinnedMesh) skinned = true;
    const geometry = object.geometry;
    const count = geometry.index ? geometry.index.count : geometry.attributes.position.count;
    triangles += count / 3;
  });

  const size = new Box3().setFromObject(root).getSize(new Vector3());
  return {
    triangles: Math.round(triangles),
    meshes,
    skinned,
    size: { width: size.x, height: size.y, depth: size.z },
  };
}
