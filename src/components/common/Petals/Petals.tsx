import { useState, type CSSProperties } from "react";

const COUNT = 18;

/** Falling cherry-blossom petals; motion is the `fall` keyframe. */
export function Petals() {
  const [petals] = useState(() =>
    Array.from({ length: COUNT }, () => {
      const scale = 0.6 + Math.random() * 0.8;
      return {
        left: `${Math.random() * 100}%`,
        width: 10 * scale,
        height: 8 * scale,
        animationDuration: `${9 + Math.random() * 9}s`,
        animationDelay: `${-Math.random() * 15}s`,
        "--dx": `${Math.random() * 160 - 80}px`,
      } as CSSProperties;
    })
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-3 overflow-hidden" id="petals" aria-hidden>
      {petals.map((style, i) => (
        <span
          key={i}
          className="absolute -top-5 animate-fall rounded-[80%_0_80%_0] bg-petal opacity-85 motion-reduce:animate-none"
          style={style}
        />
      ))}
    </div>
  );
}
