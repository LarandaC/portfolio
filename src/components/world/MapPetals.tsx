import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three";
import { createPetalGeometry } from "@/components/shared/three/three/createPetalGeometry";
import { petalFragmentShader } from "@/components/shared/three/three/petalShaders";
import { GROUND_LEVEL } from "./const/worldLayout";
import { mapPetalVertexShader } from "./three/mapPetalShader";
import { nightAmount } from "./three/nightAmount";
import { worldRuntime } from "./three/worldRuntime";

/** Petal colours: the cherry pinks of the design tokens (petal, blossom) and a touch of brand lavender. */
const COLORS = { petal: "#f6c4d6", blossom: "#e48aad", lavender: "#c9b8f5" };
/** Box of falling petals around what the camera looks at, at the default zoom. */
const BOX = new Vector3(34, 12, 34);
const DEFAULT_DISTANCE = 22;

/** Cherry petals drifting over the map, always around the part of the valley in view. */
export function MapPetals() {
  const count = window.innerWidth <= 760 ? 140 : 240;
  const geometry = useMemo(() => createPetalGeometry(count), [count]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: mapPetalVertexShader,
        fragmentShader: petalFragmentShader,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uCenter: { value: new Vector3() },
          uBox: { value: BOX.clone() },
          uScale: { value: 3.2 },
          uPetal: { value: new Color(COLORS.petal) },
          uBlossom: { value: new Color(COLORS.blossom) },
          uLavender: { value: new Color(COLORS.lavender) },
          uOpacity: { value: 0.95 },
        },
      }),
    []
  );
  const direction = useRef(new Vector3());

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(({ camera }, delta) => {
    const u = material.uniforms;
    u.uTime.value += Math.min(delta, 0.05);

    // Where the camera's gaze meets the ground: the box sits there, a little above it.
    camera.getWorldDirection(direction.current);
    const t = (GROUND_LEVEL - camera.position.y) / Math.min(direction.current.y, -0.1);
    u.uCenter.value.copy(camera.position).addScaledVector(direction.current, t);
    u.uCenter.value.y += BOX.y * 0.4;

    // Zoomed out, the view covers more ground: grow the box (and the petals) with it.
    const zoom = Math.max(1, camera.position.distanceTo(u.uCenter.value) / DEFAULT_DISTANCE);
    u.uBox.value.copy(BOX).multiplyScalar(zoom);
    u.uScale.value = 3.2 * Math.sqrt(zoom);

    // Petals catch less light at night.
    u.uOpacity.value = 0.95 - nightAmount(worldRuntime.timeOfDay) * 0.45;
  });

  return <instancedMesh args={[geometry, material, count]} frustumCulled={false} />;
}
