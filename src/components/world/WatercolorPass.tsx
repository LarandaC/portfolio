import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, HalfFloatType, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderTarget } from "three";
import { watercolorFragmentShader, watercolorVertexShader } from "./three/watercolorShader";
import { createPaperNoiseTexture } from "./three/createPaperNoiseTexture";
import { worldRuntime } from "./three/worldRuntime";
import { PHONE_MAX_WIDTH } from "@/lib/isPhone";

/** Night vignette colour (linear). */
const PAPER_NIGHT = new Color("#121838");

/** Takes over rendering (priority > 0): scene to a target, then the watercolor pass to the canvas. */
export function WatercolorPass() {
  const { gl, size, viewport } = useThree();
  const phone = size.width <= PHONE_MAX_WIDTH;

  const target = useMemo(
    // HDR for tone mapping in the pass; MSAA since the canvas antialias doesn't apply.
    () => new WebGLRenderTarget(1, 1, { type: HalfFloatType, samples: phone ? 2 : 4 }),
    [phone]
  );
  const pass = useMemo(() => {
    const material = new ShaderMaterial({
      vertexShader: watercolorVertexShader,
      fragmentShader: watercolorFragmentShader,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tScene: { value: target.texture },
        uResolution: { value: new Vector2(1, 1) },
        uPaper: { value: PAPER_NIGHT.clone() },
        uVignette: { value: 0 },
        uInk: { value: 0.55 },
        uGrain: { value: 0.07 },
        tNoise: { value: createPaperNoiseTexture() },
      },
    });
    const scene = new Scene();
    scene.add(new Mesh(new PlaneGeometry(2, 2), material));
    return { scene, material, camera: new OrthographicCamera(-1, 1, 1, -1, 0, 1) };
  }, [target]);

  useEffect(() => {
    const w = Math.round(size.width * viewport.dpr);
    const h = Math.round(size.height * viewport.dpr);
    target.setSize(w, h);
    pass.material.uniforms.uResolution.value.set(w, h);
  }, [size, viewport.dpr, target, pass]);

  useEffect(
    () => () => {
      target.dispose();
      pass.material.uniforms.tNoise.value.dispose();
      pass.material.dispose();
      pass.scene.traverse((o) => (o as Mesh).geometry?.dispose());
    },
    [target, pass]
  );

  useFrame(({ scene, camera }) => {
    pass.material.uniforms.uVignette.value = worldRuntime.night * 0.4;
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.render(pass.scene, pass.camera);
  }, 1);

  return null;
}
