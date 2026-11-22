import { DECOR, ROAM_RADIUS, SIGNPOSTS, STATIONS, WATER_LEVEL } from "../const/worldLayout";
import { terrainHeight } from "./terrainHeight";

const OBSTACLES = STATIONS.flatMap(({ building }) => {
  if (building.kind !== "model") return [];
  const [x, z] = building.position;
  const radius = building.solidRadius ?? building.size * 0.42;
  return radius > 0 ? [{ x, z, radius }] : [];
})
  .concat(DECOR.map(({ position: [x, z], solid }) => ({ x, z, radius: solid })))
  .concat(SIGNPOSTS.map(({ position: [x, z] }) => ({ x, z, radius: 0.25 })));

/** The dock: walkable over the lake. */
function onDock(x: number, z: number) {
  const dock = STATIONS.find((s) => s.building.kind === "dock");
  if (!dock) return false;
  const [dx, dz] = dock.building.position;
  return Math.hypot(x - dx, z - dz) < 3.2;
}

export function isBlocked(x: number, z: number) {
  if (Math.hypot(x, z) > ROAM_RADIUS) return true;
  if (OBSTACLES.some((o) => Math.hypot(x - o.x, z - o.z) < o.radius)) return true;
  if (onDock(x, z)) return false;
  return terrainHeight(x, z).height < WATER_LEVEL + 0.15;
}
