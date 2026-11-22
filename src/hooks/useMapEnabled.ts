import { hasWebGL } from "@/lib/three/hasWebGL";
import { useReducedMotion } from "./useReducedMotion";

/** The 3D map runs only with WebGL and when the visitor hasn't asked for reduced motion. */
export function useMapEnabled() {
  const reducedMotion = useReducedMotion();
  return hasWebGL() && !reducedMotion;
}
