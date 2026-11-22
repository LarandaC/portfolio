import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import { mapStore } from "./mapStore";

/** drei's load progress into mapStore, for the DOM loader. */
export function LoadProgressReporter() {
  const progress = useProgress((s) => s.progress);
  useEffect(() => {
    mapStore.set({ loadProgress: Math.round(progress) });
  }, [progress]);
  return null;
}
