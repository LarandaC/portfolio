import { MathUtils } from "three";
import { DECOR, GROUND_LEVEL, LAKE, MOUNTAINS, PLAZA, STATIONS, WATER_LEVEL } from "../const/worldLayout";
import { fbm2D } from "./fbm2D";
import { getWorldPath } from "./getWorldPath";

const { smoothstep, lerp: mix } = MathUtils;
const PATH_REACH = 10;

function pathDistance(x: number, z: number) {
  const { samples } = getWorldPath();
  let best = Infinity;
  for (const p of samples) {
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}

export type TerrainSample = {
  height: number;
  pathDistance: number;
};

/** Map height at (x, z): valley, hills, mountain ring, lake bowl, flat pads, plaza and paths. */
export function terrainHeight(x: number, z: number): TerrainSample {
  const r = Math.hypot(x, z);
  // Far out, r - PATH_REACH bounds the path distance.
  const dPath = r > PATH_REACH + 26 ? r - PATH_REACH : pathDistance(x, z);

  let h = GROUND_LEVEL + (fbm2D(x * 0.12, z * 0.12) - 0.5) * 0.5;
  const hills = smoothstep(dPath, 7, 24);
  if (hills > 0) h += hills * fbm2D(x * 0.05, z * 0.05) * 4;

  const mountains = smoothstep(r, MOUNTAINS.from, MOUNTAINS.to);
  if (mountains > 0) h += mountains * (12 + fbm2D(x * 0.03, z * 0.03) * 16);

  const dLake = Math.hypot(x - LAKE.x, z - LAKE.z);
  h = mix(WATER_LEVEL - 1.4, h, smoothstep(dLake, LAKE.radius - 4, LAKE.radius + 3));

  for (const { building } of STATIONS) {
    if (building.kind === "dock") continue;
    const [bx, bz] = building.position;
    const pad = building.size * 0.75;
    h = mix(GROUND_LEVEL, h, smoothstep(Math.hypot(x - bx, z - bz), pad, pad + 3));
  }
  // Lanterns are small enough for any slope.
  for (const { position: [dx, dz], size } of DECOR) {
    if (size < 3) continue;
    const pad = size * 0.6;
    h = mix(GROUND_LEVEL, h, smoothstep(Math.hypot(x - dx, z - dz), pad, pad + 3));
  }

  h = mix(GROUND_LEVEL, h, smoothstep(Math.hypot(x - PLAZA[0], z - PLAZA[1]), 4, 6.5));

  // Paths sit a touch low so the paws touch the dirt.
  h = mix(GROUND_LEVEL - 0.03, h, smoothstep(dPath, 1, 3));

  return { height: h, pathDistance: dPath };
}
