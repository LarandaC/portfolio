import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";
import { TERRAIN_SIZE, WATER_LEVEL } from "./const/worldLayout";
import { createTimeOfDay, sampleTimeOfDay } from "./three/timeOfDay";
import { waterFragmentShader, waterVertexShader } from "./three/waterShaders";
import { worldRuntime } from "./three/worldRuntime";

/** One flat water sheet at water level: the terrain hides it except in the lake. Drifting glints on top. */
export function WorldWater() {
  const tod = useMemo(createTimeOfDay, []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
        uniforms: { uColor: { value: new Color() }, uGlint: { value: new Color() }, uTime: { value: 0 } },
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ clock }) => {
    sampleTimeOfDay(worldRuntime.timeOfDay, tod);
    material.uniforms.uColor.value.copy(tod.water);
    // Glints: the sun's (or the moon's) colour, lifted towards white.
    material.uniforms.uGlint.value.copy(tod.sun).lerp(new Color(1, 1, 1), 0.5);
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={WATER_LEVEL} material={material}>
      <planeGeometry args={[TERRAIN_SIZE, TERRAIN_SIZE]} />
    </mesh>
  );
}
