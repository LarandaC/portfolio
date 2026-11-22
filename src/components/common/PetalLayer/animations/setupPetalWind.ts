import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { petalWind } from "../three/petalWind";

/** Scroll velocity becomes a gust that pushes the petals, then calms down once scrolling stops. */
export function setupPetalWind() {
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const push = gsap.utils.clamp(-1, 1, self.getVelocity() / 2500);
      gsap.to(petalWind, {
        push,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          gsap.to(petalWind, { push: 0, duration: 1.4, ease: "power2.out" });
        },
      });
    },
  });
}
