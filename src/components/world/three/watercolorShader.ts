/**
 * Watercolor look as a full-screen pass over the rendered map:
 * - a slight brush wobble (the image is sampled through low-frequency noise),
 * - pigment pooling: colour edges get darker and richer, like paint drying at a wash's border,
 * - paper grain over everything,
 * - a soft vignette that fades into the paper's colour.
 * The scene arrives in linear HDR; tone mapping and sRGB conversion happen here, at the end.
 */
export const watercolorVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const watercolorFragmentShader = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uResolution;
  uniform vec3 uPaper;
  uniform float uInk;
  uniform float uGrain;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p = p * 2.03 + 11.7;
      a *= 0.5;
    }
    return v;
  }
  float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec2 px = 1.0 / uResolution;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    // Brush wobble: a few pixels of low-frequency drift.
    vec2 wobble = vec2(fbm(vUv * aspect * 9.0), fbm(vUv * aspect * 9.0 + 5.2)) - 0.5;
    vec2 uv = vUv + wobble * px * 4.0;
    vec3 color = texture2D(tScene, uv).rgb;

    // Edges (Sobel on luminance) where pigment pools.
    vec2 o = px * 1.5;
    float tl = luma(texture2D(tScene, uv + vec2(-o.x,  o.y)).rgb);
    float tc = luma(texture2D(tScene, uv + vec2( 0.0,  o.y)).rgb);
    float tr = luma(texture2D(tScene, uv + vec2( o.x,  o.y)).rgb);
    float ml = luma(texture2D(tScene, uv + vec2(-o.x,  0.0)).rgb);
    float mr = luma(texture2D(tScene, uv + vec2( o.x,  0.0)).rgb);
    float bl = luma(texture2D(tScene, uv + vec2(-o.x, -o.y)).rgb);
    float bc = luma(texture2D(tScene, uv + vec2( 0.0, -o.y)).rgb);
    float br = luma(texture2D(tScene, uv + vec2( o.x, -o.y)).rgb);
    float gx = (tr + 2.0 * mr + br) - (tl + 2.0 * ml + bl);
    float gy = (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br);
    float edge = smoothstep(0.06, 0.32, length(vec2(gx, gy)));
    // Darker, more saturated at the border of each wash.
    color = mix(color, pow(color, vec3(1.45)) * 0.8, edge * uInk);

    // Paper grain: fine, static, multiplied in.
    float grain = fbm(gl_FragCoord.xy / 2.2) + fbm(gl_FragCoord.xy / 9.0) * 0.6;
    color *= 1.0 - uGrain + grain * uGrain * 1.25;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>

    // Soft vignette into the paper (after tone mapping, so the paper colour is exact).
    vec2 d = (vUv - 0.5) * vec2(aspect.x * 0.75, 1.0);
    float vignette = smoothstep(0.42, 0.9, length(d));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uPaper, vignette * 0.4);

    #include <colorspace_fragment>
  }
`;
