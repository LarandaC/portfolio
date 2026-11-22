import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, ShaderMaterial, Vector3, type DirectionalLight, type Fog, type HemisphereLight, type Mesh } from "three";
import { skyFragmentShader, skyVertexShader } from "./three/skyShaders";
import { worldRuntime } from "./three/worldRuntime";

/** Sky, lights and fog following the time of day. */
export function WorldAtmosphere() {
  const sky = useRef<Mesh>(null);
  const sun = useRef<DirectionalLight>(null);
  const hemi = useRef<HemisphereLight>(null);
  const fog = useRef<Fog>(null);
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
    const { tod } = worldRuntime;
    const u = material.uniforms;
    u.uTop.value.copy(tod.top);
    u.uHorizon.value.copy(tod.horizon);
    u.uGround.value.copy(tod.ground);
    u.uSun.value.copy(tod.sun);
    u.uSunDirection.value.copy(tod.sunDirection);
    sky.current?.position.copy(camera.position);

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
      // Fog only reaches the far mountains, at any zoom.
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
