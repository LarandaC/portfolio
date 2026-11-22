/** Sky dome: vertical gradient (ground → horizon → top) plus a soft glow around the sun or moon. */
export const skyVertexShader = /* glsl */ `
  varying vec3 vDirection;
  void main() {
    vDirection = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const skyFragmentShader = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uHorizon;
  uniform vec3 uGround;
  uniform vec3 uSun;
  uniform vec3 uSunDirection;
  varying vec3 vDirection;

  void main() {
    vec3 dir = normalize(vDirection);
    float h = dir.y;
    vec3 color = h > 0.0
      ? mix(uHorizon, uTop, pow(clamp(h, 0.0, 1.0), 0.55))
      : mix(uHorizon, uGround, pow(clamp(-h * 3.0, 0.0, 1.0), 0.6));
    float glow = max(dot(dir, normalize(uSunDirection)), 0.0);
    color += uSun * (pow(glow, 24.0) * 0.55 + pow(glow, 400.0) * 1.2);
    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;
