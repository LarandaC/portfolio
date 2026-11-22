import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, HalfFloatType, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, WebGLRenderTarget } from "three";
import { watercolorFragmentShader, watercolorVertexShader } from "./three/watercolorShader";
import { nightAmount } from "./three/nightAmount";
import { worldRuntime } from "./three/worldRuntime";

/** Paper colour the vignette fades into: warm white by day, ink blue at night (linear, as three stores it). */
const PAPER_DAY = new Color("#f4ecdc");
const PAPER_NIGHT = new Color("#121838");

/**
 * Takes over rendering (useFrame priority > 0): the scene goes into an off-screen target,
 * then a full-screen watercolor pass draws it to the canvas. DOM labels are unaffected.
 */
export function WatercolorPass() {
  const { gl, size, viewport } = useThree();
  const phone = size.width <= 760;

  const target = useMemo(
    // HDR so tone mapping can happen in the pass; MSAA because the canvas' own antialias doesn't apply here.
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
        uPaper: { value: new Color() },
        uInk: { value: 0.55 },
        uGrain: { value: 0.07 },
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
      pass.material.dispose();
      pass.scene.traverse((o) => (o as Mesh).geometry?.dispose());
    },
    [target, pass]
  );

  useFrame(({ scene, camera }) => {
    pass.material.uniforms.uPaper.value.copy(PAPER_DAY).lerp(PAPER_NIGHT, nightAmount(worldRuntime.timeOfDay));
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.render(pass.scene, pass.camera);
  }, 1);

  return null;
}
