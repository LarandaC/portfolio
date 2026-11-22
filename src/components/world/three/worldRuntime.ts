import { Vector3 } from "three";

/**
 * Per-frame state of the map scene, written by MapController and read by Amaru, the camera and the sky.
 * Lives only in the lazily loaded scene chunk (it imports three).
 */
export const worldRuntime = {
  /** Amaru's feet. */
  position: new Vector3(),
  /** Direction Amaru faces (yaw, radians). */
  heading: 0,
  /** Current walking speed, world units per second. */
  speed: 0,
  /** The controller has somewhere to go (keys held or a route). */
  wantsToMove: false,
  /** Amaru is on his feet (not sitting, sitting down or standing up), so he may move. */
  canMove: true,
  /** Time of day on the storyboard scale (0 dawn … 5 night), eased towards `timeTarget`. */
  timeOfDay: 3,
  timeTarget: 3,
};
