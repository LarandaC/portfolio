import { MathUtils } from "three";

/** 0 by day, 1 at night, from the time of day (0 afternoon … 2 night): how much the night effects show. */
export function nightAmount(time: number) {
  return MathUtils.smoothstep(time, 0.6, 1.9);
}
