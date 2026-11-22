import { BufferAttribute, Color, MathUtils, PlaneGeometry } from "three";
import { TERRAIN_SIZE, WATER_LEVEL } from "../const/worldLayout";
import { fbm2D } from "./fbm2D";
import { terrainHeight } from "./terrainHeight";

const GROUND = {
  grassLight: new Color("#9cc978"),
  grassDark: new Color("#6f9f5c"),
  dirt: new Color("#d6b48a"),
  sand: new Color("#e8d8ad"),
  rock: new Color("#9a98a8"),
  snow: new Color("#f3f1fa"),
};

/** The valley as one mesh with per-vertex colours. */
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
    // Fade the sand: a hard cut made a jagged shore.
    color.lerp(GROUND.sand, MathUtils.clamp((WATER_LEVEL + 0.9 - height) / 0.7, 0, 1));
    // Warmer grass along the path.
    if (pathDistance < 2.4) color.lerp(GROUND.dirt, 0.25 * (1 - pathDistance / 2.4));
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}
