import { useEffect, useRef } from "react";

export interface ParallaxRefs {
  farRef:   React.RefObject<HTMLDivElement>;
  midRef:   React.RefObject<HTMLDivElement>;
  nearRef:  React.RefObject<HTMLDivElement>;
  leftRef:  React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
}

export function useHeroParallax(): ParallaxRefs {
  const farRef   = useRef<HTMLDivElement>(null);
  const midRef   = useRef<HTMLDivElement>(null);
  const nearRef  = useRef<HTMLDivElement>(null);
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.055);
      cy = lerp(cy, ty, 0.055);

      farRef.current?.style.setProperty(  "transform", `translate(${cx * -5}px,  ${cy * -3}px)`);
      midRef.current?.style.setProperty(  "transform", `translate(${cx * -13}px, ${cy * -8}px)`);
      nearRef.current?.style.setProperty( "transform", `translate(${cx * -26}px, ${cy * -16}px)`);
      leftRef.current?.style.setProperty( "transform", `translate(${cx * 16}px,  ${cy * 9}px)`);
      rightRef.current?.style.setProperty("transform", `translate(${cx * -16}px, ${cy * 9}px)`);

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { farRef, midRef, nearRef, leftRef, rightRef };
}
