/** World-space petals in a box that follows the camera target, wrapping at its edges. */
import { petalShapeGlsl } from "@/components/common/PetalLayer/three/petalShaders";

export const mapPetalVertexShader = /* glsl */ `
  attribute vec4 aSeed;    // x, y, z start in the box (0..1), w = phase
  attribute vec4 aMotion;  // fall speed, sway, spin speed, scale
  attribute float aTint;   // 0 = pink petal, 1 = lavender

  uniform float uTime;
  uniform vec3 uCenter;    // middle of the box, world units
  uniform vec3 uBox;       // size of the box
  uniform float uScale;    // petal size multiplier (they're seen from far above)

  varying vec2 vUv;
  varying float vShade;
  varying float vTint;
  varying float vDepth;

  ${petalShapeGlsl}

  void main() {
    vUv = uv;
    vTint = aTint;
    float phase = aSeed.w * 6.28318;

    float shade;
    vec3 p = petalShape(position, aMotion.w * uScale, phase, uTime * aMotion.z + phase, shade);
    vShade = shade;

    vec3 travel = aSeed.xyz * uBox;
    travel.y -= uTime * aMotion.x * 18.0;
    travel.x += uTime * 0.7 + sin(uTime * 0.55 + phase) * aMotion.y * 30.0;
    travel.z += uTime * 0.35 + cos(uTime * 0.4 + phase) * aMotion.y * 20.0;
    vec3 rel = mod(travel - uCenter + uBox * 0.5, uBox) - uBox * 0.5;

    // Fade at the sides so wrapping doesn't pop.
    vec2 edge = abs(rel.xz) / uBox.xz;
    vDepth = 1.0 - smoothstep(0.32, 0.5, max(edge.x, edge.y));

    gl_Position = projectionMatrix * viewMatrix * vec4(uCenter + rel + p, 1.0);
  }
`;
