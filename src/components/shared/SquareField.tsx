import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SIZE = 46;

/** Faint grid squares that fade in and out at the top of a section. */
export function SquareField({ count }: { count: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [squares] = useState(() =>
    Array.from({ length: count }, () => ({
      left: Math.floor(Math.random() * 30) * 48 - 10,
      top: Math.floor(Math.random() * 6) * 48 + 6,
    }))
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".grid-sq").forEach((sq) => {
        gsap.fromTo(
          sq,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 4,
            repeatDelay: Math.random() * 3,
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 top-0 z-1 h-[42%] [mask-image:linear-gradient(#000,transparent)]"
      aria-hidden
    >
      {squares.map((sq, i) => (
        <span
          key={i}
          className="grid-sq pointer-events-none absolute rounded-[10px] border border-grid"
          style={{ left: sq.left, top: sq.top, width: SIZE, height: SIZE }}
        />
      ))}
    </div>
  );
}
