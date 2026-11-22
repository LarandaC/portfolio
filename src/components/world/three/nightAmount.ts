/** 0 by day, 1 at night: how much the night effects (glows, stars, fireflies) should show. */
export function nightAmount(timeOfDay: number) {
  const t = Math.min(1, Math.max(0, (timeOfDay - 3.6) / (4.9 - 3.6)));
  return t * t * (3 - 2 * t);
}
