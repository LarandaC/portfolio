import { CatmullRomCurve3, Vector3 } from "three";
import { GROUND_LEVEL, PLAZA, STATIONS } from "../const/worldLayout";

export type Spoke = {
  stationIndex: number;
  /** Evenly spaced, plaza (0) to door (last). */
  points: Vector3[];
};

export type WorldPath = {
  spokes: Spoke[];
  samples: Vector3[];
};

const DENSITY = 2;

let cached: WorldPath | undefined;

/** A curved path from the plaza to each door; built once, shared by terrain, ribbon and routing. */
export function getWorldPath(): WorldPath {
  if (cached) return cached;

  const start = new Vector3(PLAZA[0], GROUND_LEVEL, PLAZA[1]);
  const spokes: Spoke[] = STATIONS.flatMap(({ door: [x, z] }, stationIndex) => {
    if (x === PLAZA[0] && z === PLAZA[1]) return [];
    const end = new Vector3(x, GROUND_LEVEL, z);
    // Slight bend so paths don't look ruled.
    const mid = start.clone().lerp(end, 0.5);
    const side = new Vector3(-(end.z - start.z), 0, end.x - start.x).normalize().multiplyScalar(1.4);
    const curve = new CatmullRomCurve3([start, mid.add(side), end], false, "centripetal");
    const points = curve.getSpacedPoints(Math.max(4, Math.round(curve.getLength() * DENSITY)));
    return [{ stationIndex, points }];
  });

  cached = { spokes, samples: spokes.flatMap((s) => s.points) };
  return cached;
}
