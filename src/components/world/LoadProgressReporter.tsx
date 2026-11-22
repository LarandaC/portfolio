import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { mapStore } from "./mapStore";

/**
 * Copies drei's loading progress (the models, as three's loading manager counts them) into the map store,
 * so the DOM loading screen can show it without importing three.js itself.
 */
export function LoadProgressReporter() {
  const progress = useProgress((s) => s.progress);
  useEffect(() => {
    mapStore.set({ loadProgress: Math.round(progress) });
  }, [progress]);
  return null;
}
