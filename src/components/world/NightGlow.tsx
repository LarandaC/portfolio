import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { glowMaterials } from "./three/glowMaterials";
import { worldRuntime } from "./three/worldRuntime";

/** Makes the models' glowing materials brighter at night; only writes when the night amount changes. */
export function NightGlow() {
  const last = useRef(-1);
  useFrame(() => {
    const night = worldRuntime.night;
    if (Math.abs(night - last.current) < 1e-3 && last.current >= 0) return;
    last.current = night;
    const intensity = 1 + night * 2.5;
    glowMaterials.forEach((m) => (m.emissiveIntensity = intensity));
  });
  return null;
}
