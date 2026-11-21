import { Canvas } from "@react-three/fiber";
import { PetalSwarm } from "@/components/shared/three/PetalSwarm";
import type { SceneProps } from "@/components/shared/three/three/types";
import { MIST_LAYERS } from "../const/constants";
import { HeroCameraRig } from "./HeroCameraRig";
import { MistPlane } from "./MistPlane";

/** Hero depth scene: watercolor mist layers and petals sharing one camera, over the video. */
export function HeroScene({ count, colors, active }: SceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 30 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      // offsetSize ignores CSS transforms, so the intro's zoom on #app doesn't shrink the canvas.
      resize={{ offsetSize: true }}
    >
      <HeroCameraRig />
      {MIST_LAYERS.map((layer) => (
        <MistPlane key={layer.seed} layer={layer} colors={colors} />
      ))}
      <PetalSwarm count={count} colors={colors} />
    </Canvas>
  );
}

export default HeroScene;
