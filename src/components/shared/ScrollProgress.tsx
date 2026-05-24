import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-gradient-to-r from-primary to-secondary-foreground"
      style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
    />
  );
}
