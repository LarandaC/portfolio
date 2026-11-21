/**
 * Watercolor mist: domain-warped fbm noise, gathered in a low band of the plane
 * (valley fog) and cleared around the headline so the copy stays legible.
 */
export const mistVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const mistFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform float uSpeed;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform vec3 uTint;
  uniform vec2 uResolution;
  uniform vec3 uClear;   // screen-space x, y (0..1, y up) and radius kept clear for the headline

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = vUv * vec2(3.2, 1.6) + vec2(uTime * uSpeed + uSeed * 13.0, uSeed * 7.0);
    float warp = fbm(p * 0.6 + vec2(uTime * 0.015, 0.0));
    float n = fbm(p + warp * 0.9);

    // Valley band: thickest low on the plane, thinning out towards the sky.
    float band = smoothstep(0.02, 0.3, vUv.y) * (1.0 - smoothstep(0.38, 0.8, vUv.y));
    float edges = smoothstep(0.0, 0.12, vUv.x) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
    float mist = smoothstep(0.38, 0.78, n) * band * edges;

    // Keep the headline clear.
    vec2 screen = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    float d = distance(screen * vec2(aspect, 1.0), uClear.xy * vec2(aspect, 1.0));
    float clearMask = mix(0.15, 1.0, smoothstep(uClear.z * 0.45, uClear.z, d));

    // Watercolor tone: lavender in the denser parts, paper-white at the wisps.
    vec3 color = mix(uColor, uTint, smoothstep(0.55, 0.9, n) * 0.35);

    gl_FragColor = vec4(color, mist * clearMask * uOpacity);
    #include <colorspace_fragment>
  }
`;
