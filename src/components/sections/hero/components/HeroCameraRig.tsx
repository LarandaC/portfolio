import { useFrame } from "@react-three/fiber";
import { heroMotion } from "../three/heroMotion";

/** Camera follows the mouse a little (parallax) and flies forward as the hero scrolls away. */
export function HeroCameraRig() {
  useFrame(({ camera }) => {
    const { pointerX, pointerY, progress } = heroMotion;
    camera.position.set(pointerX * 0.3, -pointerY * 0.18, 5 - progress * 4.4);
    camera.lookAt(pointerX * 0.08, -pointerY * 0.05, -10);
  });

  return null;
}
