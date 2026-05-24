import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { gsap } from "gsap";

interface Paw {
  id: number;
  x: number;
  flip: boolean;
}

let _pawId = 0;

function PawPrint({ flip }: { flip: boolean }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 110 100"
      fill="currentColor"
      className="text-primary/30"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <ellipse cx="20" cy="25" rx="12" ry="15" />
      <ellipse cx="46" cy="12" rx="12" ry="15" />
      <ellipse cx="72" cy="16" rx="11" ry="14" />
      <ellipse cx="92" cy="38" rx="10" ry="13" />
      <ellipse cx="52" cy="70" rx="30" ry="26" />
    </svg>
  );
}

export function CatWalker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLDivElement>(null);
  const [paws, setPaws]       = useState<Paw[]>([]);
  const [catData, setCatData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/white-cat-walking.json")
      .then((r) => r.json())
      .then(setCatData);
  }, []);

  useEffect(() => {
    if (!catData) return;

    const container = containerRef.current;
    const cat       = catRef.current;
    if (!container || !cat) return;

    const W = container.offsetWidth;

    const tl = gsap.timeline({
      repeat: -1,
      onRepeat: () => setPaws([]),
    });

    tl.fromTo(cat, { x: -110 }, { x: W + 110, duration: 22, ease: "none" });

    let step = 0;
    const interval = setInterval(() => {
      const x = gsap.getProperty(cat, "x") as number;
      const center = x + 45;
      if (center > 0 && center < W) {
        step++;
        const flip = step % 2 === 0;
        setPaws((prev) => [
          ...prev.slice(-18),
          { id: ++_pawId, x: center + (flip ? -15 : 15), flip },
        ]);
      }
    }, 480);

    return () => {
      tl.kill();
      clearInterval(interval);
    };
  }, [catData]);

  if (!catData) return null;

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 w-full h-28 pointer-events-none z-[1]"
    >
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute bottom-4 animate-paw-fade"
          style={{ left: paw.x - 10 }}
        >
          <PawPrint flip={paw.flip} />
        </div>
      ))}

      <div ref={catRef} className="absolute bottom-0" style={{ width: 90 }}>
        <Lottie animationData={catData} loop autoplay />
      </div>
    </div>
  );
}
