import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Mesh, Vector3 } from "three";
import type { ThreeEvent } from "@react-three/fiber";

type ModelBuildingProps = {
  file: string;
  /** Largest horizontal side, world units. */
  size: number;
  position: [number, number, number];
  /** Yaw that turns the model's front towards its door. */
  rotationY: number;
  /** Clicking sends Amaru there. Omit for decor (not clickable). */
  onSelect?: () => void;
};

const setCursor = (value: string) => () => {
  document.body.style.cursor = value;
};

/** A downloaded model, scaled to `size`, standing on the ground. Clickable when it's a station's building. */
export function ModelBuilding({ file, size, position, rotationY, onSelect }: ModelBuildingProps) {
  const gltf = useGLTF(file);

  // A copy per use, measured once: scale to the footprint and lift its base to y = 0.
  const { scene, scale, offset } = useMemo(() => {
    const copy = gltf.scene.clone(true);
    copy.traverse((o) => {
      if (o instanceof Mesh) {
        o.castShadow = false;
        o.receiveShadow = false;
      }
    });
    const box = new Box3().setFromObject(copy);
    const dims = box.getSize(new Vector3());
    const s = size / Math.max(dims.x, dims.z, 1e-6);
    const center = box.getCenter(new Vector3());
    return { scene: copy, scale: s, offset: new Vector3(-center.x, -box.min.y, -center.z) };
  }, [gltf.scene, size]);

  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect?.();
  };
  const interactive = onSelect ? { onClick: click, onPointerOver: setCursor("pointer"), onPointerOut: setCursor("") } : {};

  return (
    <group position={position} rotation-y={rotationY} {...interactive}>
      <group scale={scale}>
        <primitive object={scene} position={offset} />
      </group>
    </group>
  );
}
