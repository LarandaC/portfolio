import { DECOR, ROAM_RADIUS, STATIONS, WATER_LEVEL } from "../const/worldLayout";
import { terrainHeight } from "./terrainHeight";

/**
 * Solid circles Amaru can't walk through: buildings (except walk-through ones like the shrine's gate)
 * and decor. The dock is walkable.
 */
const OBSTACLES = STATIONS.flatMap(({ building }) => {
  if (building.kind !== "model") return [];
  const [x, z] = building.position;
  const radius = building.solidRadius ?? building.size * 0.42;
  return radius > 0 ? [{ x, z, radius }] : [];
}).concat(DECOR.map(({ position: [x, z], solid }) => ({ x, z, radius: solid })));

/** The dock's planks: a strip over the water from the shore. Walkable even though it's over the lake. */
function onDock(x: number, z: number) {
  const dock = STATIONS.find((s) => s.building.kind === "dock");
  if (!dock) return false;
  const [dx, dz] = dock.building.position;
  return Math.hypot(x - dx, z - dz) < 3.2;
}

/** Whether Amaru may stand at (x, z): inside the valley, not in the water, not inside a building. */
export function isBlocked(x: number, z: number) {
  if (Math.hypot(x, z) > ROAM_RADIUS) return true;
  if (OBSTACLES.some((o) => Math.hypot(x - o.x, z - o.z) < o.radius)) return true;
  if (onDock(x, z)) return false;
  return terrainHeight(x, z).height < WATER_LEVEL + 0.15;
}
