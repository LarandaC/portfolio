import { BufferAttribute, Color, PlaneGeometry } from "three";
import { TERRAIN_SIZE, WATER_LEVEL } from "../const/worldLayout";
import { fbm2D } from "./fbm2D";
import { terrainHeight } from "./terrainHeight";

/** Ground colors of the valley (watercolor anime: soft, flat greens and warm dirt). */
const GROUND = {
  grassLight: new Color("#9cc978"),
  grassDark: new Color("#6f9f5c"),
  dirt: new Color("#d6b48a"),
  sand: new Color("#e8d8ad"),
  rock: new Color("#9a98a8"),
  snow: new Color("#f3f1fa"),
};

/** The valley as one mesh: heights from terrainHeight, flat colors per vertex (path, sand, grass, rock, snow). */
export function createTerrainGeometry(segments: number) {
  const geometry = new PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, segments, segments);
  geometry.rotateX(-Math.PI / 2);

  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const color = new Color();

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = position.getZ(i);
    const { height, pathDistance } = terrainHeight(x, z);
    position.setY(i, height);

    color.copy(GROUND.grassLight).lerp(GROUND.grassDark, fbm2D(x * 0.06, z * 0.06));
    if (height > 9) color.lerp(GROUND.rock, Math.min(1, (height - 9) / 4));
    if (height > 20) color.lerp(GROUND.snow, Math.min(1, (height - 20) / 3));
    // Sand fades in towards the waterline (a hard cut-off made a jagged, toothed shore).
    color.lerp(GROUND.sand, Math.min(1, Math.max(0, (WATER_LEVEL + 0.9 - height) / 0.7)));
    // Slightly warmer grass along the path's edges (the path itself is WorldPathRibbon).
    if (pathDistance < 2.4) color.lerp(GROUND.dirt, 0.25 * (1 - pathDistance / 2.4));
    colors.set([color.r, color.g, color.b], i * 3);
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}
