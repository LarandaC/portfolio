import { Color, MathUtils, Vector3 } from "three";

/** Afternoon → dusk → night palettes (world colours, not UI tokens). */
const PALETTES = [
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

/** Reused so sampling allocates nothing. */
export function createTimeOfDay(): TimeOfDay {
  return { ...PALETTES[0], top: new Color(), horizon: new Color(), ground: new Color(), sun: new Color(), sky: new Color(), water: new Color(), sunDirection: new Vector3() };
}

export function sampleTimeOfDay(time: number, out: TimeOfDay) {
  const i = MathUtils.clamp(Math.floor(time), 0, PALETTES.length - 2);
  const t = MathUtils.clamp(time - i, 0, 1);
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
  // At night the "sun" is the moon.
  const azimuth = 0.24 + time * 0.48;
  out.sunDirection.set(Math.sin(azimuth), out.sunHeight, Math.cos(azimuth)).normalize();
  return out;
}
