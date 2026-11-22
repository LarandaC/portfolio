import { useSyncExternalStore } from "react";
import { mapStore, type MapState } from "./mapStore";

/** Reads one value of the map state and re-renders only when it changes. */
export function useMapStore<T>(select: (state: MapState) => T): T {
  return useSyncExternalStore(mapStore.subscribe, () => select(mapStore.get()));
}
