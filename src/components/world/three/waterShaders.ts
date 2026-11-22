/** Flat toon water with drifting hard-edged glints. */
export const waterVertexShader = /* glsl */ `
  varying vec2 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

export const waterFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uGlint;
  uniform float uTime;
  varying vec2 vWorld;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 p = vWorld * vec2(0.55, 1.1);
    float n = noise(p + vec2(uTime * 0.18, uTime * 0.05)) + noise(p * 1.9 - vec2(uTime * 0.11, uTime * 0.07)) * 0.6;
    float glint = smoothstep(1.12, 1.2, n);
    float ripple = smoothstep(0.95, 1.05, n) * 0.12;
    vec3 color = uColor * (1.0 + ripple) + uGlint * glint * 0.55;
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
