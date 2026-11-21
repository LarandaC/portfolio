import { gsap } from "gsap";
import { heroMotion } from "../three/heroMotion";

/** Mouse position, eased, drives the hero camera's parallax. Only with a precise pointer and motion allowed. */
export function setupHeroPointer(mm: gsap.MatchMedia) {
  mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
    const toX = gsap.quickTo(heroMotion, "pointerX", { duration: 1.4, ease: "power3.out" });
    const toY = gsap.quickTo(heroMotion, "pointerY", { duration: 1.4, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      toX((e.clientX / window.innerWidth) * 2 - 1);
      toY((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set(heroMotion, { pointerX: 0, pointerY: 0 });
    };
  });
}
