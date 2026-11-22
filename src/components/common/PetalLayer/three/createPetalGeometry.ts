import { InstancedBufferAttribute, PlaneGeometry } from "three";

/** Subdivided plane (shaped in the shader) with per-instance seeds. */
export function createPetalGeometry(count: number) {
  const geometry = new PlaneGeometry(0.085, 0.1, 4, 6);

  const seed = new Float32Array(count * 4);
  const motion = new Float32Array(count * 4);
  const tint = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    seed.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
    motion.set(
      [
        0.035 + Math.random() * 0.045, // fall speed
        0.015 + Math.random() * 0.035, // sway amplitude
        0.4 + Math.random() * 1.1, // spin speed
        0.55 + Math.random() * 0.6, // scale
      ],
      i * 4
    );
    tint[i] = Math.random() < 0.22 ? 0.7 + Math.random() * 0.3 : Math.random() * 0.15;
  }

  geometry.setAttribute("aSeed", new InstancedBufferAttribute(seed, 4));
  geometry.setAttribute("aMotion", new InstancedBufferAttribute(motion, 4));
  geometry.setAttribute("aTint", new InstancedBufferAttribute(tint, 1));
  return geometry;
}
