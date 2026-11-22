/** Petal shaders: motion runs on the GPU from per-instance seeds; positions are 0..1 across the frustum. */

/** Shared by the hero and map petals: cups the plane and tumbles it; returns offset and shade. */
export const petalShapeGlsl = /* glsl */ `
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

  vec3 petalShape(vec3 position, float scale, float phase, float angle, out float shade) {
    vec3 p = position;
    p.z += p.x * p.x * 6.0 - p.y * 0.25;
    p *= scale;
    vec3 axis = vec3(sin(phase), cos(phase * 1.3), sin(phase * 0.7) + 0.6);
    mat3 r = rotateAxis(axis, angle);
    vec3 n = r * vec3(0.0, 0.0, 1.0);
    shade = abs(dot(n, normalize(vec3(0.3, 0.7, 1.0))));
    return r * p;
  }
`;

export const petalVertexShader = /* glsl */ `
  attribute vec4 aSeed;    // x, y, z (0 = far, 1 = near) start, w = phase
  attribute vec4 aMotion;  // fall speed, sway, spin speed, scale
  attribute float aTint;   // 0 = pink petal, 1 = lavender

  uniform float uTime;
  uniform vec2 uWind;      // accumulated scroll push (normalized screen units)
  uniform float uSwirl;    // accumulated extra spin from scrolling
  uniform vec2 uView;      // tan(fov / 2) * aspect, tan(fov / 2)
  uniform float uCameraZ;
  uniform float uSize;     // shrinks petals on narrow (portrait) screens

  varying vec2 vUv;
  varying float vShade;
  varying float vTint;
  varying float vDepth;

  ${petalShapeGlsl}

  void main() {
    vUv = uv;
    vTint = aTint;

    float phase = aSeed.w * 6.28318;
    float depth = aSeed.z;
    vDepth = depth;

    float shade;
    vec3 p = petalShape(position, aMotion.w * uSize, phase, uTime * aMotion.z + phase + uSwirl * aMotion.z, shade);
    vShade = shade;

    // Near petals fall faster on screen (parallax).
    float fall = aMotion.x * mix(0.6, 1.4, depth);
    float sway = sin(uTime * 0.55 + phase) * aMotion.y + sin(uTime * 1.3 + phase * 2.0) * aMotion.y * 0.3;
    float drift = mix(0.5, 1.2, depth);

    float x01 = fract(aSeed.x + uTime * 0.012 + sway + uWind.x * drift);
    float y01 = fract(aSeed.y - uTime * fall + uWind.y * drift);

    // Camera-relative depth; margin so wrapping happens off-screen.
    float dist = mix(9.0, 3.5, depth);
    float z = uCameraZ - dist;
    vec3 world = vec3(
      (x01 - 0.5) * 2.4 * dist * uView.x,
      (y01 - 0.5) * 2.4 * dist * uView.y,
      z
    ) + p;

    gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
  }
`;

export const petalFragmentShader = /* glsl */ `
  uniform vec3 uPetal;
  uniform vec3 uBlossom;
  uniform vec3 uLavender;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vShade;
  varying float vTint;
  varying float vDepth;

  void main() {
    // Silhouette: narrow base, round notched tip.
    float v = vUv.y;
    float x = abs(vUv.x - 0.5);
    float halfWidth = 0.47 * sqrt(clamp(v, 0.0, 1.0)) * (1.0 - pow(v, 6.0));
    float notch = 1.0 - 0.14 * (1.0 - smoothstep(0.0, 0.16, x));
    float edge = min(halfWidth - x, notch - v);
    float alpha = smoothstep(0.0, 0.035, edge);
    if (alpha < 0.01) discard;

    vec3 color = mix(uPetal, uLavender, vTint);
    color = mix(uBlossom, color, smoothstep(0.0, 0.5, v));           // deeper pink at the base
    color *= 1.0 - 0.07 * (1.0 - smoothstep(0.0, 0.025, x)) * smoothstep(0.1, 0.75, v); // soft vein
    color *= mix(0.8, 1.08, vShade);
    color = mix(color, vec3(1.0), 0.15 * (1.0 - vDepth));             // far petals fade into the air

    gl_FragColor = vec4(color, alpha * uOpacity * mix(0.5, 1.0, vDepth));
    #include <colorspace_fragment>
  }
`;
