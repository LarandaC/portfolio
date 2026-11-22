/**
 * Values GSAP writes and the hero's 3D scene reads in useFrame.
 * - progress: 0 → 1 as the hero scrolls away (camera eases forward)
 * - pointerX / pointerY: smoothed mouse position, -1 → 1 (camera parallax)
 */
export const heroMotion = { progress: 0, pointerX: 0, pointerY: 0 };
