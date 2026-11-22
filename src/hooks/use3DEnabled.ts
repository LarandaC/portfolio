import { hasWebGL } from "@/lib/three/hasWebGL";
import { useReducedMotion } from "./useReducedMotion";

/** 3D (the map, the petals) runs only with WebGL and when the visitor hasn't asked for reduced motion. */
export function use3DEnabled() {
  const reducedMotion = useReducedMotion();
  return hasWebGL() && !reducedMotion;
}
