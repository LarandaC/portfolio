import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { HERO_GLASS } from "../const/constants";

/** Flickering frosted squares laid over the hero video. */
export function HeroGlass() {
  const ref = useRef<HTMLDivElement>(null);
  const [squares] = useState(() => {
    const isMobile = window.innerWidth <= 760;
    return HERO_GLASS.filter((_, i) => !(isMobile && i % 2 === 1));
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".glass").forEach((sq) => {
        // fromTo so the yoyo always returns to full opacity, even if it
        // starts while the intro is still fading the squares in.
        gsap.fromTo(sq, { opacity: 1 }, {
          opacity: 0.15,
          immediateRender: false,
          duration: 0.9,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 3,
          repeatDelay: 1 + Math.random() * 3,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-5" id="heroGlass" aria-hidden>
      {squares.map(([x, y]) => (
        <span
          key={`${x}-${y}`}
          className="glass"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: x > 40 && x < 60 ? "clamp(28px,3.4vw,44px)" : "clamp(36px,5.4vw,74px)",
            aspectRatio: 1,
          }}
        />
      ))}
    </div>
  );
}
