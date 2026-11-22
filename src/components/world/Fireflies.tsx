import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from "three";
import { ROAM_RADIUS, WATER_LEVEL } from "./const/worldLayout";
import { terrainHeight } from "./three/terrainHeight";
import { worldRuntime } from "./three/worldRuntime";
import { isPhone } from "@/lib/isPhone";
import { mulberry32 } from "./three/mulberry32";

const vertexShader = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vBlink;
  void main() {
    vec3 p = position;
    float t = uTime * 0.6 + aSeed * 40.0;
    // Slow wandering loops around their home spot.
    p += vec3(sin(t * 0.7) * 0.9, sin(t * 1.3) * 0.35, cos(t * 0.5) * 0.9);
    vBlink = smoothstep(0.2, 1.0, sin(uTime * (1.5 + aSeed) + aSeed * 20.0) * 0.5 + 0.5);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (5.0 + aSeed * 4.0) * uPixelRatio * (12.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying float vBlink;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float glow = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vec3(1.0, 0.92, 0.45) * glow, glow * vBlink * uOpacity);
  }
`;

/** Fireflies drifting low over the grass and the lake shore, blinking; only at night. */
export function Fireflies() {
  const points = useRef<Points>(null);
  const count = isPhone() ? 60 : 110;

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const random = mulberry32(11);
    for (let i = 0; i < count; i++) {
      const a = random() * Math.PI * 2;
      const r = 3 + Math.sqrt(random()) * (ROAM_RADIUS - 3);
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const ground = Math.max(terrainHeight(x, z).height, WATER_LEVEL);
      positions.set([x, ground + 0.6 + random() * 1.8, z], i * 3);
      seeds[i] = random();
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uPixelRatio: { value: 1 } },
      }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(({ clock, gl }) => {
    const night = worldRuntime.night;
    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uOpacity.value = night;
    material.uniforms.uPixelRatio.value = gl.getPixelRatio();
    if (points.current) points.current.visible = night > 0.01;
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}
