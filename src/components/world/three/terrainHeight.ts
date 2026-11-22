import { DECOR, GROUND_LEVEL, LAKE, MOUNTAINS, PLAZA, STATIONS, WATER_LEVEL } from "../const/worldLayout";
import { fbm2D } from "./fbm2D";
import { getWorldPath } from "./getWorldPath";

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Distance on the ground plane to the nearest path sample. */
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
  /** Distance to the dirt path (0 on it). */
  pathDistance: number;
};

/**
 * Height of the map at (x, z): a gently rolling valley floor, hills rising towards a ring of mountains,
 * the lake bowl, flat pads under every building, the plaza and the paths flattened on top.
 */
export function terrainHeight(x: number, z: number): TerrainSample {
  const dPath = pathDistance(x, z);
  const r = Math.hypot(x, z);

  // Valley floor with soft bumps, hills farther from the path.
  let h =
    GROUND_LEVEL +
    (fbm2D(x * 0.12, z * 0.12) - 0.5) * 0.5 +
    smoothstep(7, 24, dPath) * fbm2D(x * 0.05, z * 0.05) * 4;

  // Ring of mountains closing the valley.
  h += smoothstep(MOUNTAINS.from, MOUNTAINS.to, r) * (12 + fbm2D(x * 0.03, z * 0.03) * 16);

  // Lake bowl.
  const dLake = Math.hypot(x - LAKE.x, z - LAKE.z);
  h = mix(WATER_LEVEL - 1.4, h, smoothstep(LAKE.radius - 4, LAKE.radius + 3, dLake));

  // Flat pads where the buildings stand.
  for (const { building } of STATIONS) {
    if (building.kind === "dock") continue;
    const [bx, bz] = building.position;
    const pad = building.size * 0.75;
    h = mix(GROUND_LEVEL, h, smoothstep(pad, pad + 3, Math.hypot(x - bx, z - bz)));
  }
  // …and under the big decor (bell tower, maple); lanterns are small enough to sit on any slope.
  for (const { position: [dx, dz], size } of DECOR) {
    if (size < 3) continue;
    const pad = size * 0.6;
    h = mix(GROUND_LEVEL, h, smoothstep(pad, pad + 3, Math.hypot(x - dx, z - dz)));
  }

  // The plaza in the middle.
  h = mix(GROUND_LEVEL, h, smoothstep(4, 6.5, Math.hypot(x - PLAZA[0], z - PLAZA[1])));

  // The paths: flat, a touch below ground so Amaru's paws touch the dirt.
  h = mix(GROUND_LEVEL - 0.03, h, smoothstep(1, 3, dPath));

  return { height: h, pathDistance: dPath };
}
