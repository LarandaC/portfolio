import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollParallax(
  gridRef:    RefObject<HTMLDivElement>,
  contentRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(gridRef.current, {
        y: 90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "50% top",
          scrub: true,
        },
      });

      gsap.to(contentRef.current, {
        y: -55,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "18% top",
          end: "58% top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [gridRef, contentRef]);
}
