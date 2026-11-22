import { Color, Vector3 } from "three";

/**
 * One light palette per station (storyboard: dawn → morning → noon → afternoon → dusk → night).
 * These are the world's own colors, not UI tokens; the scene blends between them as Amaru walks.
 */
const PALETTES = [
  { top: "#f4a98c", horizon: "#ffd9b3", ground: "#c9b8f5", sun: "#ffc79a", sunIntensity: 2, sky: "#ffd9c4", hemi: 1.1, water: "#9aa9d8", sunHeight: 0.18 }, // Amanecer
  { top: "#8fc3ee", horizon: "#e2f1fb", ground: "#cfe3c8", sun: "#fff4e0", sunIntensity: 2.4, sky: "#dceefa", hemi: 1.3, water: "#7fb4d8", sunHeight: 0.55 }, // Mañana
  { top: "#5fa8e8", horizon: "#d4ecfb", ground: "#cde4c0", sun: "#ffffff", sunIntensity: 2.7, sky: "#cfe8fb", hemi: 1.4, water: "#5fa2d4", sunHeight: 0.9 }, // Mediodía
  { top: "#86b4e0", horizon: "#fbe7c4", ground: "#d8d2b0", sun: "#ffdca0", sunIntensity: 2.3, sky: "#f6e6cc", hemi: 1.2, water: "#7ea6c9", sunHeight: 0.45 }, // Tarde
  { top: "#7c5cd6", horizon: "#f6a8b8", ground: "#b597d6", sun: "#ff9f7a", sunIntensity: 1.8, sky: "#f3b3c4", hemi: 1, water: "#8c78c4", sunHeight: 0.12 }, // Atardecer
  { top: "#0d1440", horizon: "#36407e", ground: "#1d2350", sun: "#b9c6ff", sunIntensity: 0.9, sky: "#4a5394", hemi: 0.55, water: "#27306a", sunHeight: 0.5 }, // Noche (luna)
].map((p) => ({
  top: new Color(p.top),
  horizon: new Color(p.horizon),
  ground: new Color(p.ground),
  sun: new Color(p.sun),
  sky: new Color(p.sky),
  water: new Color(p.water),
  sunIntensity: p.sunIntensity,
  hemi: p.hemi,
  sunHeight: p.sunHeight,
}));

export type TimeOfDay = (typeof PALETTES)[number] & { sunDirection: Vector3 };

/** A reusable result object, so sampling every frame allocates nothing. */
export function createTimeOfDay(): TimeOfDay {
  return { ...PALETTES[0], top: new Color(), horizon: new Color(), ground: new Color(), sun: new Color(), sky: new Color(), water: new Color(), sunDirection: new Vector3() };
}

/** Blends the two palettes around `station` (0..5) into `out`. */
export function sampleTimeOfDay(station: number, out: TimeOfDay) {
  const i = Math.min(PALETTES.length - 2, Math.max(0, Math.floor(station)));
  const t = Math.min(1, Math.max(0, station - i));
  const a = PALETTES[i];
  const b = PALETTES[i + 1];
  out.top.copy(a.top).lerp(b.top, t);
  out.horizon.copy(a.horizon).lerp(b.horizon, t);
  out.ground.copy(a.ground).lerp(b.ground, t);
  out.sun.copy(a.sun).lerp(b.sun, t);
  out.sky.copy(a.sky).lerp(b.sky, t);
  out.water.copy(a.water).lerp(b.water, t);
  out.sunIntensity = a.sunIntensity + (b.sunIntensity - a.sunIntensity) * t;
  out.hemi = a.hemi + (b.hemi - a.hemi) * t;
  out.sunHeight = a.sunHeight + (b.sunHeight - a.sunHeight) * t;
  // The sun travels east → west across the day; at night the "sun" is the moon.
  const azimuth = -1.2 + (station / 5) * 2.4;
  out.sunDirection.set(Math.sin(azimuth), out.sunHeight, Math.cos(azimuth)).normalize();
  return out;
}
