import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { PetalSwarm } from "./PetalSwarm";
import type { SceneProps } from "./three/types";

/** Lazy, so three.js stays out of the main chunk. */
export function PetalScene({ count, colors, active, children }: SceneProps & { children?: ReactNode }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      // offsetSize ignores CSS transforms, so the intro's zoom on #app doesn't shrink the canvas.
      resize={{ offsetSize: true }}
    >
      {children}
      <PetalSwarm count={count} colors={colors} />
    </Canvas>
  );
}

export default PetalScene;
