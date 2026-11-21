import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2, Vector3, type Mesh, type PerspectiveCamera } from "three";
import type { SceneColors } from "@/components/shared/three/three/types";
import { mistFragmentShader, mistVertexShader } from "../three/mistShaders";
import { heroMotion } from "../three/heroMotion";
import type { MIST_LAYERS } from "../const/constants";

type MistPlaneProps = {
  layer: (typeof MIST_LAYERS)[number];
  colors: SceneColors;
};

/** Camera's starting z: planes are sized to fill the view from there, so flying in makes them grow. */
const START_Z = 5;

/** One drifting watercolor-mist layer at a fixed depth; fades out as the camera flies through it. */
export function MistPlane({ layer, colors }: MistPlaneProps) {
  const ref = useRef<Mesh>(null);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: mistVertexShader,
        fragmentShader: mistFragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uSeed: { value: layer.seed },
          uSpeed: { value: layer.speed },
          uOpacity: { value: 0 },
          uColor: { value: new Color() },
          uTint: { value: new Color() },
          uResolution: { value: new Vector2(1, 1) },
          uClear: { value: new Vector3() },
        },
      }),
    [layer]
  );

  useEffect(() => {
    material.uniforms.uColor.value.setStyle(colors.mist);
    material.uniforms.uTint.value.setStyle(colors.lavender);
  }, [colors, material]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    const camera = state.camera as PerspectiveCamera;
    const u = material.uniforms;

    // Fill the starting view at this depth, with margin for the camera's parallax.
    const height = 2 * (START_Z - layer.z) * Math.tan((camera.fov * Math.PI) / 360) * 1.35;
    mesh.scale.set(height * camera.aspect, height, 1);

    // Dissolve as the camera reaches the layer; the mist thickens a little as the hero scrolls away.
    const dist = camera.position.z - layer.z;
    const fade = Math.min(1, Math.max(0, (dist - 0.25) / 1.4));
    u.uOpacity.value = layer.opacity * (1 + heroMotion.progress * 0.6) * fade;
    mesh.visible = fade > 0;

    u.uTime.value += Math.min(delta, 0.05);
    u.uResolution.value.set(state.size.width * state.viewport.dpr, state.size.height * state.viewport.dpr);
    // Keep the headline clear: bottom-right on wide screens, bottom-center on portrait.
    if (camera.aspect < 1) u.uClear.value.set(0.5, 0.22, 0.6);
    else u.uClear.value.set(0.84, 0.2, 0.42);
  });

  return (
    <mesh ref={ref} position={[0, 0, layer.z]} material={material}>
      <planeGeometry />
    </mesh>
  );
}
