import type { StationId } from "./const/worldLayout";

/** State shared by the map's DOM UI (useMapStore) and the scene (useFrame). No three.js. */
export type MapState = {
  panel: StationId | null;
  /** Station Amaru is walking to; its panel opens on arrival. */
  target: StationId | null;
  /** Door Amaru stands at. */
  nearby: StationId | null;
  introOpen: boolean;
  ready: boolean;
  /** Camera distance (smaller = closer). */
  zoom: number;
  night: boolean;
  /** "low" once the device proves slow. */
  quality: "high" | "low";
  /** Still slow at low quality: offer /simple. */
  slowNotice: boolean;
  /** 0–100. */
  loadProgress: number;
};

export type MapCommand = { type: "station"; id: StationId } | { type: "point"; x: number; z: number };

export const ZOOM = { min: 9, max: 50, initial: 22 };

let state: MapState = { panel: null, target: null, nearby: null, introOpen: true, ready: false, zoom: ZOOM.initial, night: false, quality: "high", slowNotice: false, loadProgress: 0 };
const listeners = new Set<() => void>();

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

  goTo(id: StationId) {
    pending = { type: "station", id };
    mapStore.set({ introOpen: false, panel: null, target: id });
  },
  goToPoint(x: number, z: number) {
    pending = { type: "point", x, z };
    mapStore.set({ introOpen: false, panel: null, target: null });
  },
  /** Takes the latest command. */
  takeCommand() {
    const command = pending;
    pending = null;
    return command;
  },
  zoomBy(factor: number) {
    mapStore.set({ zoom: Math.min(ZOOM.max, Math.max(ZOOM.min, state.zoom * factor)) });
  },
};
