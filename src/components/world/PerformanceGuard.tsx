import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { mapStore } from "./mapStore";

/** Seconds to let shaders and models settle. */
const SETTLE = 2.5;
const SAMPLE = 3;
/** Under 30 on purpose: battery-saver phones cap at 30 fps and run fine there. */
const LOW_QUALITY_FPS = 28;
const SLOW_FPS = 18;
/** Longer frames are pauses (tab switch, decode); generous because slow devices draw 0.3–0.5 s frames. */
const MAX_FRAME = 1;

type Phase = "settle-high" | "measure-high" | "settle-low" | "measure-low" | "done";

/** Measures fps: too slow → quality "low"; still slow → slowNotice. */
export function PerformanceGuard() {
  const phase = useRef<Phase>("settle-high");
  const elapsed = useRef(0);
  const frames = useRef<number[]>([]);
  const time = useRef(0);

  useFrame((_, delta) => {
    if (phase.current === "done" || !mapStore.get().ready || document.hidden) return;
    if (delta > MAX_FRAME) return;
    elapsed.current += delta;

    const measuring = phase.current === "measure-high" || phase.current === "measure-low";
    if (!measuring) {
      if (elapsed.current >= SETTLE) {
        phase.current = phase.current === "settle-high" ? "measure-high" : "measure-low";
        elapsed.current = time.current = 0;
        frames.current = [];
      }
      return;
    }

    frames.current.push(delta);
    time.current += delta;
    if (time.current < SAMPLE) return;
    // Median, so a single hitch doesn't count.
    const sorted = [...frames.current].sort((a, b) => a - b);
    const fps = 1 / sorted[Math.floor(sorted.length / 2)];

    if (phase.current === "measure-high") {
      if (fps < LOW_QUALITY_FPS) {
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
