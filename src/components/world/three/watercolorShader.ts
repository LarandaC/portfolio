/**
 * Watercolor pass: brush wobble, pigment at edges, paper grain, night vignette (none by day: it read as haze).
 * Input is linear HDR; tone mapping and sRGB happen here.
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
  uniform float uVignette;
  uniform sampler2D tNoise;
  varying vec2 vUv;

  float luma(vec3 c) {
    return dot(c, vec3(0.299, 0.587, 0.114));
  }

  void main() {
    vec2 px = 1.0 / uResolution;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    vec2 wobble = texture2D(tNoise, vUv * aspect * (9.0 / 16.0)).rg - 0.5;
    vec2 uv = vUv + wobble * px * 4.0;
    vec3 color = texture2D(tScene, uv).rgb;

    // Sobel on luminance.
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
    color = mix(color, pow(color, vec3(1.45)) * 0.8, edge * uInk);

    float grain = texture2D(tNoise, gl_FragCoord.xy / (2.2 * 64.0)).b + texture2D(tNoise, gl_FragCoord.xy / (9.0 * 16.0)).a * 0.6;
    color *= 1.0 - uGrain + grain * uGrain * 1.25;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>

    // After tone mapping, so the paper colour is exact.
    vec2 d = (vUv - 0.5) * vec2(aspect.x * 0.75, 1.0);
    float vignette = smoothstep(0.42, 0.9, length(d));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uPaper, vignette * uVignette);

    #include <colorspace_fragment>
  }
`;
