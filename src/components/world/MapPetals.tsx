import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three";
import { createPetalGeometry } from "@/components/common/PetalLayer/three/createPetalGeometry";
import { petalFragmentShader } from "@/components/common/PetalLayer/three/petalShaders";
import { GROUND_LEVEL } from "./const/worldLayout";
import { mapPetalVertexShader } from "./three/mapPetalShader";
import { worldRuntime } from "./three/worldRuntime";
import { ZOOM } from "./mapStore";
import { isPhone } from "@/lib/isPhone";

const COLORS = { petal: "#f6c4d6", blossom: "#e48aad", lavender: "#c9b8f5" };
/** At the default zoom. */
const BOX = new Vector3(34, 12, 34);
const DEFAULT_DISTANCE = ZOOM.initial;

export function MapPetals() {
  const count = isPhone() ? 140 : 240;
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

    // Where the camera's gaze meets the ground.
    camera.getWorldDirection(direction.current);
    const t = (GROUND_LEVEL - camera.position.y) / Math.min(direction.current.y, -0.1);
    u.uCenter.value.copy(camera.position).addScaledVector(direction.current, t);
    u.uCenter.value.y += BOX.y * 0.4;

    // Grow the box with the zoom.
    const zoom = Math.max(1, camera.position.distanceTo(u.uCenter.value) / DEFAULT_DISTANCE);
    u.uBox.value.copy(BOX).multiplyScalar(zoom);
    u.uScale.value = 3.2 * Math.sqrt(zoom);

    u.uOpacity.value = 0.95 - worldRuntime.night * 0.45;
  });

  return <instancedMesh args={[geometry, material, count]} frustumCulled={false} />;
}
