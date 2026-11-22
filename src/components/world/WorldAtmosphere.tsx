import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, ShaderMaterial, Vector3, type DirectionalLight, type Fog, type HemisphereLight, type Mesh } from "three";
import { skyFragmentShader, skyVertexShader } from "./three/skyShaders";
import { createTimeOfDay, sampleTimeOfDay } from "./three/timeOfDay";
import { worldRuntime } from "./three/worldRuntime";

/** Sky, sun/moon light, ambient light and fog, all following the time of day of Amaru's station. */
export function WorldAtmosphere() {
  const sky = useRef<Mesh>(null);
  const sun = useRef<DirectionalLight>(null);
  const hemi = useRef<HemisphereLight>(null);
  const fog = useRef<Fog>(null);
  const tod = useMemo(createTimeOfDay, []);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        side: BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new Color() },
          uHorizon: { value: new Color() },
          uGround: { value: new Color() },
          uSun: { value: new Color() },
          uSunDirection: { value: new Vector3() },
        },
      }),
    []
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ camera }) => {
    sampleTimeOfDay(worldRuntime.timeOfDay, tod);
    const u = material.uniforms;
    u.uTop.value.copy(tod.top);
    u.uHorizon.value.copy(tod.horizon);
    u.uGround.value.copy(tod.ground);
    u.uSun.value.copy(tod.sun);
    u.uSunDirection.value.copy(tod.sunDirection);
    sky.current?.position.copy(camera.position); // the dome never gets closer

    if (sun.current) {
      sun.current.color.copy(tod.sun);
      sun.current.intensity = tod.sunIntensity;
      sun.current.position.copy(tod.sunDirection).multiplyScalar(80);
    }
    if (hemi.current) {
      hemi.current.color.copy(tod.sky);
      hemi.current.groundColor.copy(tod.ground);
      hemi.current.intensity = tod.hemi;
    }
    if (fog.current) {
      fog.current.color.copy(tod.horizon);
      // Fog only softens the far mountains, well past the map, however far the camera is zoomed out.
      const d = camera.position.distanceTo(worldRuntime.position);
      fog.current.near = d * 1.8 + 30;
      fog.current.far = d * 4 + 160;
    }
  });

  return (
    <>
      <mesh ref={sky} material={material} renderOrder={-10} frustumCulled={false}>
        <sphereGeometry args={[450, 32, 16]} />
      </mesh>
      <fog ref={fog} attach="fog" args={["#ffffff", 50, 210]} />
      <hemisphereLight ref={hemi} />
      <directionalLight ref={sun} />
    </>
  );
}
