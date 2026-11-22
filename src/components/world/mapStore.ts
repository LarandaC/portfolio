import type { StationId } from "./const/worldLayout";

/**
 * Shared state between the map's DOM interface (menu, panels, HUD) and the 3D scene.
 * Plain module, no three.js: the UI reads it with useMapStore, the scene in useFrame.
 */
export type MapState = {
  /** Section panel currently open, if any. */
  panel: StationId | null;
  /** Station Amaru is walking to (its panel opens on arrival); null once there or if he's sent elsewhere. */
  target: StationId | null;
  /** Station whose door Amaru is standing at (shows the "enter" prompt). */
  nearby: StationId | null;
  /** The welcome card (hero content) is showing. */
  introOpen: boolean;
  /** The scene has loaded and drawn its first frame. */
  ready: boolean;
  /** Camera distance: smaller = closer. */
  zoom: number;
  /** Night on the map (follows the dark theme). */
  night: boolean;
  /** "low" once the device proves slow: lower resolution, no watercolor, petals or fireflies, fewer trees. */
  quality: "high" | "low";
  /** Still slow at low quality: offer the simple version (until the visitor dismisses it). */
  slowNotice: boolean;
};

export type MapCommand = { type: "station"; id: StationId } | { type: "point"; x: number; z: number };

export const ZOOM = { min: 9, max: 50, initial: 22, overview: 50 };

let state: MapState = { panel: null, target: null, nearby: null, introOpen: true, ready: false, zoom: ZOOM.initial, night: false, quality: "high", slowNotice: false };
const listeners = new Set<() => void>();

/** Movement request for the scene to pick up on its next frame. */
let pending: MapCommand | null = null;

export const mapStore = {
  get: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  set(patch: Partial<MapState>) {
    const next = { ...state, ...patch };
    if ((Object.keys(patch) as (keyof MapState)[]).every((k) => next[k] === state[k])) return;
    state = next;
    listeners.forEach((l) => l());
  },

  /** Walk Amaru to a station along the path; its panel opens on arrival. */
  goTo(id: StationId) {
    pending = { type: "station", id };
    mapStore.set({ introOpen: false, panel: null, target: id });
  },
  /** Walk Amaru straight to a spot on the ground. */
  goToPoint(x: number, z: number) {
    pending = { type: "point", x, z };
    mapStore.set({ introOpen: false, panel: null, target: null });
  },
  /** The scene takes the latest command (one at a time). */
  takeCommand() {
    const command = pending;
    pending = null;
    return command;
  },
  zoomBy(factor: number) {
    mapStore.set({ zoom: Math.min(ZOOM.max, Math.max(ZOOM.min, state.zoom * factor)) });
  },
};
