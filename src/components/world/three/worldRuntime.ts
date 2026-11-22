import { Vector3 } from "three";
import { createTimeOfDay } from "./timeOfDay";

/** Per-frame scene state: MapController writes, Amaru, camera and sky read. */
export const worldRuntime = {
  position: new Vector3(),
  /** Yaw, radians. */
  heading: 0,
  speed: 0,
  wantsToMove: false,
  /** Standing, so he may move. */
  canMove: true,
  /** 0 afternoon … 2 night, eased on theme changes. */
  timeOfDay: 0,
  /** Sampled once per frame by MapController. */
  tod: createTimeOfDay(),
  night: 0,
};
