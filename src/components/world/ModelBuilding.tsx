import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { glowMaterials } from "./three/glowMaterials";
import { useClickable } from "./useClickable";

type ModelBuildingProps = {
  file: string;
  size: number;
  position: [number, number, number];
  rotationY: number;
  /** Omit for decor. */
  onSelect?: () => void;
};

export function ModelBuilding({ file, size, position, rotationY, onSelect }: ModelBuildingProps) {
  const gltf = useGLTF(file);

  // A copy per use, base lifted to y = 0.
  const { scene, scale, offset } = useMemo(() => {
    const copy = gltf.scene.clone(true);
    copy.traverse((o) => {
      if (o instanceof Mesh) {
        o.castShadow = false;
        o.receiveShadow = false;
        const m = o.material;
        // NightGlow brightens it at night.
        if (m instanceof MeshStandardMaterial && (m.emissiveMap || m.emissive.getHex() !== 0)) glowMaterials.add(m);
      }
    });
    const box = new Box3().setFromObject(copy);
    const dims = box.getSize(new Vector3());
    const s = size / Math.max(dims.x, dims.z, 1e-6);
    const center = box.getCenter(new Vector3());
    return { scene: copy, scale: s, offset: new Vector3(-center.x, -box.min.y, -center.z) };
  }, [gltf.scene, size]);

  const handlers = useClickable(onSelect);

  return (
    <group position={position} rotation-y={rotationY} {...handlers}>
      <group scale={scale}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  );
}
