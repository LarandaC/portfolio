import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, DoubleSide, ShaderMaterial, Vector2, type PerspectiveCamera } from "three";
import { createPetalGeometry } from "./three/createPetalGeometry";
import { petalFragmentShader, petalVertexShader } from "./three/petalShaders";
import { petalWind } from "./three/petalWind";
import type { SceneColors } from "./three/types";

type PetalSwarmProps = {
  count: number;
  colors: SceneColors;
};

/** Hundreds of tumbling petals in one draw call; motion lives in the vertex shader. */
export function PetalSwarm({ count, colors }: PetalSwarmProps) {
  const geometry = useMemo(() => createPetalGeometry(count), [count]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: petalVertexShader,
        fragmentShader: petalFragmentShader,
        transparent: true,
        // Writes depth (and draws first) so mist layers in 3D scenes sit correctly in front of / behind petals.
        depthWrite: true,
        side: DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uWind: { value: new Vector2() },
          uSwirl: { value: 0 },
          uView: { value: new Vector2(1, 1) },
          uCameraZ: { value: 5 },
          uSize: { value: 1 },
          uPetal: { value: new Color() },
          uBlossom: { value: new Color() },
          uLavender: { value: new Color() },
          uOpacity: { value: 0.9 },
        },
      }),
    []
  );

  useEffect(() => {
    material.uniforms.uPetal.value.setStyle(colors.petal);
    material.uniforms.uBlossom.value.setStyle(colors.blossom);
    material.uniforms.uLavender.value.setStyle(colors.lavender);
  }, [colors, material]);

  // Created by hand, so freed by hand.
  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    const dt = Math.min(delta, 0.05); // no jump after a hidden tab
    const camera = state.camera as PerspectiveCamera;
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360);

    u.uTime.value += dt;
    u.uView.value.set(tanHalf * camera.aspect, tanHalf);
    u.uCameraZ.value = camera.position.z;
    u.uSize.value = Math.min(1, Math.max(0.65, camera.aspect / 1.4));
    // Scrolling down lifts the petals with the page and blows them sideways.
    u.uWind.value.x += petalWind.push * dt * 0.25;
    u.uWind.value.y += petalWind.push * dt * 0.45;
    u.uSwirl.value += Math.abs(petalWind.push) * dt * 3;
  });

  return <instancedMesh args={[geometry, material, count]} frustumCulled={false} renderOrder={-1} />;
}
