import { PetalScene, type SceneProps } from "@/components/common/PetalLayer";
import { HeroCameraRig } from "./HeroCameraRig";

/** Hero scene: the petals, with a camera that follows the mouse for a touch of depth. */
export function HeroScene(props: SceneProps) {
  return (
    <PetalScene {...props}>
      <HeroCameraRig />
    </PetalScene>
  );
}

export default HeroScene;
