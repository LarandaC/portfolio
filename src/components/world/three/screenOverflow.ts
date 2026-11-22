import { Vector3, type Camera } from "three";

/** Usable part of the screen in normalized device coordinates (-1..1), leaving room for the HUD. */
const LIMIT_X = 0.9;
const LIMIT_Y_TOP = 0.88;
const LIMIT_Y_BOTTOM = -0.8;
/** Measure a little above the paws, so his head stays in view too. */
const BODY_HEIGHT = 0.4;

const point = new Vector3();

/**
 * How far past the screen's edge a point on the ground at (x, y, z) would be drawn, in NDC units
 * (0 = inside the usable area). Used to keep Amaru on screen.
 */
export function screenOverflow(x: number, y: number, z: number, camera: Camera) {
  point.set(x, y + BODY_HEIGHT, z).project(camera);
  const overX = Math.max(0, Math.abs(point.x) - LIMIT_X);
  const overY = Math.max(0, point.y - LIMIT_Y_TOP, LIMIT_Y_BOTTOM - point.y);
  return overX + overY;
}
