/**
 * Petals in world space for the map (the hero's petals are laid out in screen space for a front-facing
 * camera, which doesn't work with the isometric view). Same varyings as the shared petal fragment shader.
 *
 * Each petal falls and drifts with the breeze inside a box that follows what the camera looks at,
 * wrapping around its edges, so there are always petals in view without simulating the whole valley.
 */
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

  mat3 rotateAxis(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    return mat3(
      oc * axis.x * axis.x + c,          oc * axis.x * axis.y + axis.z * s, oc * axis.z * axis.x - axis.y * s,
      oc * axis.x * axis.y - axis.z * s, oc * axis.y * axis.y + c,          oc * axis.y * axis.z + axis.x * s,
      oc * axis.z * axis.x + axis.y * s, oc * axis.y * axis.z - axis.x * s, oc * axis.z * axis.z + c
    );
  }

  void main() {
    vUv = uv;
    vTint = aTint;
    float phase = aSeed.w * 6.28318;

    // Cupped petal, tumbling around its own axis.
    vec3 p = position;
    p.z += p.x * p.x * 6.0 - p.y * 0.25;
    p *= aMotion.w * uScale;
    vec3 axis = vec3(sin(phase), cos(phase * 1.3), sin(phase * 0.7) + 0.6);
    mat3 r = rotateAxis(axis, uTime * aMotion.z + phase);
    p = r * p;
    vec3 n = r * vec3(0.0, 0.0, 1.0);
    vShade = abs(dot(n, normalize(vec3(0.3, 0.7, 1.0))));

    // Fall, drift with a steady breeze, sway; then wrap into the box around uCenter.
    vec3 travel = aSeed.xyz * uBox;
    travel.y -= uTime * aMotion.x * 18.0;
    travel.x += uTime * 0.7 + sin(uTime * 0.55 + phase) * aMotion.y * 30.0;
    travel.z += uTime * 0.35 + cos(uTime * 0.4 + phase) * aMotion.y * 20.0;
    vec3 rel = mod(travel - uCenter + uBox * 0.5, uBox) - uBox * 0.5;

    // Fade towards the box's sides so wrapping petals don't pop in.
    vec2 edge = abs(rel.xz) / uBox.xz;
    vDepth = 1.0 - smoothstep(0.32, 0.5, max(edge.x, edge.y));

    gl_Position = projectionMatrix * viewMatrix * vec4(uCenter + rel + p, 1.0);
  }
`;
