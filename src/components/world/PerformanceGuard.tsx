import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { mapStore } from "./mapStore";

/** Seconds to let the scene settle (shaders compiling, models arriving) before measuring. */
const SETTLE = 2.5;
/** Seconds of frames averaged per check. */
const SAMPLE = 3;
/**
 * Below this, drop to low quality. Under 30 on purpose: phones in battery-saver mode cap the frame rate
 * at 30 and run the map smoothly there, so they keep the effects.
 */
const LOW_QUALITY_FPS = 28;
/** Still below this at low quality: suggest the simple version. */
const SLOW_FPS = 18;
/**
 * A frame longer than this is a pause (tab switch, a long model decode), not the device's pace: skip it.
 * Kept generous: a very slow device draws frames of 0.3–0.5 s, and those must count.
 */
const MAX_FRAME = 1;

type Phase = "settle-high" | "measure-high" | "settle-low" | "measure-low" | "done";

/**
 * Measures the frame rate once the map is on screen. If the device can't keep up, it lowers the quality
 * (lower resolution; components read `quality` to drop the heavy effects). If even that is slow,
 * it raises `slowNotice` so the interface can offer the simple version. Runs a couple of checks, then rests.
 */
export function PerformanceGuard() {
  const setDpr = useThree((s) => s.setDpr);
  const phase = useRef<Phase>("settle-high");
  const elapsed = useRef(0);
  const frames = useRef(0);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (phase.current === "done" || !mapStore.get().ready || document.hidden) return;
    if (delta > MAX_FRAME) return;
    elapsed.current += delta;

    const measuring = phase.current === "measure-high" || phase.current === "measure-low";
    if (!measuring) {
      if (elapsed.current >= SETTLE) {
        phase.current = phase.current === "settle-high" ? "measure-high" : "measure-low";
        elapsed.current = frames.current = time.current = 0;
      }
      return;
    }

    frames.current++;
    time.current += delta;
    if (time.current < SAMPLE) return;
    const fps = frames.current / time.current;

    if (phase.current === "measure-high") {
      if (fps < LOW_QUALITY_FPS) {
        setDpr(1);
        mapStore.set({ quality: "low" });
        phase.current = "settle-low";
        elapsed.current = 0;
      } else {
        phase.current = "done";
      }
    } else {
      if (fps < SLOW_FPS) mapStore.set({ slowNotice: true });
      phase.current = "done";
    }
  });

  return null;
}
