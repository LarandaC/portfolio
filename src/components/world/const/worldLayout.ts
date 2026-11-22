/** Plaza (Inicio) in the middle, every other place on a ring. No three.js. */
export type Vec2 = [number, number];
export type StationId = "inicio" | "about" | "projects" | "skills" | "experience" | "contact";

export type Building =
  | {
      kind: "model";
      file: string;
      position: Vec2;
      /** Largest horizontal side. */
      size: number;
      /** Radius Amaru can't enter (default ~footprint; 0 = walk-through). */
      solidRadius?: number;
    }
  | { kind: "dock"; position: Vec2 };

export type Station = {
  id: StationId;
  labelKey: string;
  door: Vec2;
  building: Building;
};

const DOOR_RING = 10;
const BUILDING_RING = 15.5;

/** Camera axes on the ground (camera at +X/+Z looking to -X/-Z); movement, layout and signs derive from them. */
export const SCREEN_UP: Vec2 = [-Math.SQRT1_2, -Math.SQRT1_2];
export const SCREEN_RIGHT: Vec2 = [Math.SQRT1_2, -Math.SQRT1_2];

/** Ground direction, degrees clockwise from screen-up. */
const direction = (degrees: number): Vec2 => {
  const a = (degrees * Math.PI) / 180;
  return [
    SCREEN_UP[0] * Math.cos(a) + SCREEN_RIGHT[0] * Math.sin(a),
    SCREEN_UP[1] * Math.cos(a) + SCREEN_RIGHT[1] * Math.sin(a),
  ];
};
const at = (degrees: number, distance: number): Vec2 => {
  const [x, z] = direction(degrees);
  return [x * distance, z * distance];
};

const ANGLE = { contact: 0, projects: 72, experience: 144, skills: 216, about: 288 };

export const PLAZA: Vec2 = [0, 0];

export const STATIONS: Station[] = [
  // Torii at the plaza's far edge so it never hides Amaru; walk-through.
  { id: "inicio", labelKey: "nav.index", door: PLAZA, building: { kind: "model", file: "/models/shrine-wolvemancer.glb", position: at(36, 6.5), size: 6, solidRadius: 0 } },
  { id: "about", labelKey: "nav.about", door: at(ANGLE.about, DOOR_RING), building: { kind: "model", file: "/models/house-janab.glb", position: at(ANGLE.about, BUILDING_RING), size: 7 } },
  { id: "projects", labelKey: "nav.projects", door: at(ANGLE.projects, DOOR_RING), building: { kind: "model", file: "/models/pagoda.glb", position: at(ANGLE.projects, BUILDING_RING), size: 6 } },
  { id: "skills", labelKey: "nav.skills", door: at(ANGLE.skills, DOOR_RING), building: { kind: "model", file: "/models/house-ig-shero.glb", position: at(ANGLE.skills, BUILDING_RING), size: 7 } },
  { id: "experience", labelKey: "nav.experience", door: at(ANGLE.experience, DOOR_RING), building: { kind: "model", file: "/models/house-daniel-stringer.glb", position: at(ANGLE.experience, BUILDING_RING + 0.5), size: 8 } },
  { id: "contact", labelKey: "nav.contact", door: at(ANGLE.contact, DOOR_RING), building: { kind: "dock", position: at(ANGLE.contact, 13.5) } },
];

/** Yaw that turns a station's building front (+Z) towards its door. */
export const stationYaw = ({ building, door }: Station) =>
  Math.atan2(door[0] - building.position[0], door[1] - building.position[1]);

/** Dock lantern position in the dock's own space, and its light height. */
export const DOCK_LANTERN = { offset: [1.5, 2.2] as Vec2, lightHeight: 1.15 };

/** `solid`: radius Amaru can't enter. */
export type Decor = { file: string; position: Vec2; size: number; solid: number; /** Night halo. */ glow?: boolean };

const LANTERN = "/models/stone-lantern-sahir-virmani.glb";
const lanternsAt = (degrees: number): Decor[] =>
  [-14, 14].map((offset) => ({ file: LANTERN, position: at(degrees + offset, DOOR_RING - 0.5), size: 0.7, solid: 0.35, glow: true }));

export const DECOR: Decor[] = [
  { file: "/models/bell-tower-ao-interactive.glb", position: at(322, 17), size: 5, solid: 2.2 },
  { file: "/models/maple-olivermathegames.glb", position: at(ANGLE.about - 26, 16.5), size: 7, solid: 0.8 },
  ...[ANGLE.about, ANGLE.projects, ANGLE.skills, ANGLE.experience, ANGLE.contact].flatMap(lanternsAt),
  ...[108, 180, 252, 324].map((degrees) => ({ file: LANTERN, position: at(degrees, 5.2), size: 0.7, solid: 0.35, glow: true })),
];

/** A signpost where each path starts, set 15° beside it (away from the torii). */
export type Signpost = { stationId: StationId; labelKey: string; position: Vec2; direction: Vec2 };

const SIGN_RING = 5.9;
const SIGN_SIDE: Record<keyof typeof ANGLE, number> = { contact: -15, projects: 15, experience: 15, skills: 15, about: 15 };

export const SIGNPOSTS: Signpost[] = (Object.keys(ANGLE) as (keyof typeof ANGLE)[]).map((id) => ({
  stationId: id,
  labelKey: STATIONS.find((s) => s.id === id)!.labelKey,
  position: at(ANGLE[id] + SIGN_SIDE[id], SIGN_RING),
  direction: direction(ANGLE[id]),
}));

export const GROUND_LEVEL = 1;
export const WATER_LEVEL = 0;
const [lakeX, lakeZ] = at(ANGLE.contact, 22);
export const LAKE = { x: lakeX, z: lakeZ, radius: 8.5 };
export const TERRAIN_SIZE = 140;
/** Amaru's roaming radius. */
export const ROAM_RADIUS = 30;
/** Mountain ring: start and full-height radii. */
export const MOUNTAINS = { from: 34, to: 58 };
export const AMARU_HEIGHT = 0.6;
