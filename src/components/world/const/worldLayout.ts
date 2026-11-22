/**
 * Layout of the map (world units; Amaru is ~0.6 tall). No three.js imports here.
 *
 * A hub and its spokes: Inicio (the torii) is a plaza in the middle and every other place sits on a ring
 * around it, each at the end of its own path. Any trip is at most "back to the plaza, out another path".
 *
 * The isometric camera looks from +X/+Z towards -X/-Z, so screen-up is (-1, -1) on the ground and
 * screen-right is (1, -1). The ring is laid out clockwise from screen-up.
 */
export type Vec2 = [number, number];
export type StationId = "inicio" | "about" | "projects" | "skills" | "experience" | "contact";

export type Building =
  | {
      kind: "model";
      file: string;
      position: Vec2;
      /** Footprint (largest side) in world units. */
      size: number;
      /** Extra yaw if the model's front isn't +Z. */
      facingOffset?: number;
      /** Radius Amaru can't walk into (default: most of the footprint; 0 = walk through, e.g. a gate). */
      solidRadius?: number;
    }
  | { kind: "dock"; position: Vec2 };

export type Station = {
  id: StationId;
  /** i18n key of its name (same as the menu). */
  labelKey: string;
  /** Where Amaru stands to "enter": at the end of its path, in front of the building. */
  door: Vec2;
  building: Building;
};

/** Distance from the plaza to each door, and to each building behind it. */
const DOOR_RING = 10;
const BUILDING_RING = 15.5;

/** Ground direction for an angle measured clockwise from screen-up (degrees). */
const direction = (degrees: number): Vec2 => {
  const a = (degrees * Math.PI) / 180;
  const up: Vec2 = [-Math.SQRT1_2, -Math.SQRT1_2];
  const right: Vec2 = [Math.SQRT1_2, -Math.SQRT1_2];
  return [up[0] * Math.cos(a) + right[0] * Math.sin(a), up[1] * Math.cos(a) + right[1] * Math.sin(a)];
};
const at = (degrees: number, distance: number): Vec2 => {
  const [x, z] = direction(degrees);
  return [x * distance, z * distance];
};

/** Clockwise from the top of the screen: the lake (Contacto) up top, the rest around. */
const ANGLE = { contact: 0, projects: 72, experience: 144, skills: 216, about: 288 };

export const PLAZA: Vec2 = [0, 0];

export const STATIONS: Station[] = [
  // The shrine's great torii stands at the plaza's far edge, between the paths to the lake and the pagoda,
  // facing the middle: it never hides Amaru from the camera. Walk-through (it's a gate).
  { id: "inicio", labelKey: "nav.index", door: PLAZA, building: { kind: "model", file: "/models/shrine-wolvemancer.glb", position: at(36, 6.5), size: 6, solidRadius: 0 } },
  { id: "about", labelKey: "nav.about", door: at(ANGLE.about, DOOR_RING), building: { kind: "model", file: "/models/house-janab.glb", position: at(ANGLE.about, BUILDING_RING), size: 7 } },
  { id: "projects", labelKey: "nav.projects", door: at(ANGLE.projects, DOOR_RING), building: { kind: "model", file: "/models/pagoda.glb", position: at(ANGLE.projects, BUILDING_RING), size: 6 } },
  { id: "skills", labelKey: "nav.skills", door: at(ANGLE.skills, DOOR_RING), building: { kind: "model", file: "/models/house-ig-shero.glb", position: at(ANGLE.skills, BUILDING_RING), size: 7 } },
  { id: "experience", labelKey: "nav.experience", door: at(ANGLE.experience, DOOR_RING), building: { kind: "model", file: "/models/house-daniel-stringer.glb", position: at(ANGLE.experience, BUILDING_RING + 0.5), size: 8 } },
  { id: "contact", labelKey: "nav.contact", door: at(ANGLE.contact, DOOR_RING), building: { kind: "dock", position: at(ANGLE.contact, 13.5) } },
];

/** Decorative models: no panel, not in the menu. `solid` = radius Amaru can't walk into. */
export type Decor = { file: string; position: Vec2; size: number; rotation?: number; solid: number };

const LANTERN = "/models/stone-lantern-sahir-virmani.glb";
/** A pair of stone lanterns either side of a door, set back from the path. */
const lanternsAt = (degrees: number): Decor[] =>
  [-14, 14].map((offset) => ({ file: LANTERN, position: at(degrees + offset, DOOR_RING - 0.5), size: 0.7, solid: 0.35 }));

export const DECOR: Decor[] = [
  // Bell tower on the lake shore, beside the path to Contacto.
  { file: "/models/bell-tower-ao-interactive.glb", position: at(322, 17), size: 5, solid: 2.2 },
  // A great maple beside the house of Sobre mí (on the side away from the bell tower).
  { file: "/models/maple-olivermathegames.glb", position: at(ANGLE.about - 26, 16.5), size: 7, solid: 0.8 },
  // Stone lanterns: a pair at every door, and four around the plaza.
  ...[ANGLE.about, ANGLE.projects, ANGLE.skills, ANGLE.experience, ANGLE.contact].flatMap(lanternsAt),
  ...[108, 180, 252, 324].map((degrees) => ({ file: LANTERN, position: at(degrees, 5.2), size: 0.7, solid: 0.35 })),
];

/**
 * Wooden signposts at the plaza, one where each path starts, pointing to its place.
 * Set beside the path (15° off it, on the side away from the torii), facing along it.
 */
export type Signpost = { stationId: StationId; labelKey: string; position: Vec2; direction: Vec2 };

const SIGN_RING = 5.9;
const SIGN_SIDE: Record<keyof typeof ANGLE, number> = { contact: -15, projects: 15, experience: 15, skills: 15, about: 15 };

export const SIGNPOSTS: Signpost[] = (Object.keys(ANGLE) as (keyof typeof ANGLE)[]).map((id) => ({
  stationId: id,
  labelKey: STATIONS.find((s) => s.id === id)!.labelKey,
  position: at(ANGLE[id] + SIGN_SIDE[id], SIGN_RING),
  direction: direction(ANGLE[id]),
}));

/** Ground height of the valley floor and the paths. */
export const GROUND_LEVEL = 1;
export const WATER_LEVEL = 0;
const [lakeX, lakeZ] = at(ANGLE.contact, 22);
export const LAKE = { x: lakeX, z: lakeZ, radius: 8.5 };
/** Side of the square terrain mesh. */
export const TERRAIN_SIZE = 140;
/** Amaru can roam inside this radius from the plaza (hills and mountains beyond). */
export const ROAM_RADIUS = 30;
/** The ring of mountains closing the valley: starts rising here, full height here. */
export const MOUNTAINS = { from: 34, to: 58 };
/** Amaru's height in world units. */
export const AMARU_HEIGHT = 0.6;
