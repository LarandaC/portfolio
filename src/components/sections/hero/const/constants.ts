/** [x%, y%] positions of the frosted squares over the hero video. */
export const HERO_GLASS: [number, number][] = [
  // left
  [3, 64], [3, 71], [6.5, 71], [10, 71], [3, 78],
  [-1, 70],
  // center
  [45.5, 76], [49, 80], [49, 76], [52.5, 76],
  // (no right group: the copy sits bottom-right)
];


/**
 * Mist layers of the hero's 3D scene, far to near. `z` is the world depth (camera starts at z = 5
 * and dollies to ~0.6 on scroll, so the nearest layers are flown through).
 */
export const MIST_LAYERS = [
  { z: -6.5, opacity: 0.32, speed: 0.006, seed: 0.13 },
  { z: -3.5, opacity: 0.3, speed: 0.009, seed: 0.41 },
  { z: -1, opacity: 0.26, speed: 0.012, seed: 0.77 },
  { z: 1.2, opacity: 0.22, speed: 0.016, seed: 0.29 },
  { z: 3, opacity: 0.18, speed: 0.02, seed: 0.58 },
];
