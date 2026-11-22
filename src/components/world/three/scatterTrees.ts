import { DECOR, STATIONS, WATER_LEVEL } from "../const/worldLayout";
import { terrainHeight } from "./terrainHeight";
import { mulberry32 } from "./mulberry32";

export type TreeSpot = { x: number; y: number; z: number; scale: number; rotation: number; sakura: boolean };

function nearBuilding(x: number, z: number) {
  if (DECOR.some(({ position: [dx, dz], size }) => Math.hypot(x - dx, z - dz) < size * 0.6 + 1.5)) return true;
  return STATIONS.some(({ building, door }) => {
    const [bx, bz] = building.position;
    const clear = building.kind === "model" ? building.size * 0.8 + 1 : 4;
    return Math.hypot(x - bx, z - bz) < clear || Math.hypot(x - door[0], z - door[1]) < 3;
  });
}

/** Trees on dry ground below the rocky heights; ~70% cherry. */
export function scatterTrees(count: number, radius: number): TreeSpot[] {
  const random = mulberry32(20261121);
  const spots: TreeSpot[] = [];

  for (let tries = 0; spots.length < count && tries < count * 12; tries++) {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * radius;
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    if (nearBuilding(x, z)) continue;
    const { height, pathDistance } = terrainHeight(x, z);
    if (pathDistance < 2.8 || height < WATER_LEVEL + 0.5 || height > 11) continue;

    spots.push({
      x,
      y: height,
      z,
      scale: 0.55 + random() * 0.6,
      rotation: random() * Math.PI * 2,
      sakura: random() < 0.7,
    });
  }
  return spots;
}
