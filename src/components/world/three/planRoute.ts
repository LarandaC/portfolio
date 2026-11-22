import { Vector3 } from "three";
import { PLAZA, STATIONS, type StationId } from "../const/worldLayout";
import { getWorldPath } from "./getWorldPath";

/** Farther than this from every path, first walk straight to the nearest. */
const OFF_PATH = 3;

/** Waypoints to a station's door: back to the plaza if on another path, then out along its path. */
export function planRoute(from: Vector3, id: StationId): Vector3[] {
  const { spokes } = getWorldPath();
  const targetIndex = STATIONS.findIndex((s) => s.id === id);
  const [doorX, doorZ] = STATIONS[targetIndex].door;

  let spoke = spokes[0];
  let index = 0;
  let best = Infinity;
  for (const s of spokes) {
    s.points.forEach((p, i) => {
      const d = (p.x - from.x) ** 2 + (p.z - from.z) ** 2;
      if (d < best) {
        best = d;
        spoke = s;
        index = i;
      }
    });
  }

  const route: Vector3[] = [];
  if (Math.sqrt(best) > OFF_PATH) route.push(spoke.points[index]);

  if (spoke.stationIndex === targetIndex) {
    route.push(...spoke.points.slice(index + 1));
  } else {
    route.push(...spoke.points.slice(0, index).reverse());
    // Inicio is the plaza itself.
    const out = spokes.find((s) => s.stationIndex === targetIndex);
    if (out) route.push(...out.points.slice(1));
  }
  route.push(new Vector3(doorX, 0, doorZ));
  if (targetIndex === 0) route.push(new Vector3(PLAZA[0], 0, PLAZA[1]));
  return route;
}
