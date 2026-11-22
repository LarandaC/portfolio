import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, PointsMaterial, type Points } from "three";
import { nightAmount } from "./three/nightAmount";
import { worldRuntime } from "./three/worldRuntime";

const COUNT = 700;
const RADIUS = 420;

/** Stars on the upper sky; they fade in at night and stay put relative to the camera, like the sky dome. */
export function WorldStars() {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    let seed = 7;
    const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let i = 0; i < COUNT; i++) {
      // Uniform on the upper part of a sphere (above ~10° so the mountains don't cut them).
      const y = 0.17 + random() * 0.83;
      const r = Math.sqrt(1 - y * y);
      const a = random() * Math.PI * 2;
      positions.set([Math.cos(a) * r * RADIUS, y * RADIUS, Math.sin(a) * r * RADIUS], i * 3);
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    return g;
  }, []);
  const material = useMemo(
    () => new PointsMaterial({ color: "#fff6e0", size: 2, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(({ camera, clock }) => {
    const night = nightAmount(worldRuntime.timeOfDay);
    material.opacity = night * (0.85 + Math.sin(clock.elapsedTime * 1.7) * 0.1);
    if (points.current) {
      points.current.visible = night > 0.01;
      points.current.position.copy(camera.position);
    }
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} renderOrder={-9} />;
}
