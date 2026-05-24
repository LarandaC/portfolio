import { useEffect, useRef } from "react";
import {
  SiReact, SiTypescript, SiHtml5, SiAngular, SiNodedotjs,
  SiPython, SiPostgresql, SiGit, SiFigma, SiMui, SiNextdotjs, SiOpenai,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface Tech {
  name: string;
  Icon: IconType;
}

const TECHS: Tech[] = [
  { name: "React",       Icon: SiReact },
  { name: "TypeScript",  Icon: SiTypescript },
  { name: "HTML / CSS",  Icon: SiHtml5 },
  { name: "Angular",     Icon: SiAngular },
  { name: "Next.js",     Icon: SiNextdotjs },
  { name: "Node.js",     Icon: SiNodedotjs },
  { name: "Python",      Icon: SiPython },
  { name: "PostgreSQL",  Icon: SiPostgresql },
  { name: "Git",         Icon: SiGit },
  { name: "Figma",       Icon: SiFigma },
  { name: "Material UI", Icon: SiMui },
  { name: "AI",          Icon: SiOpenai },
];

const RADIUS = 118;
const SPEED  = 0.0032;
const TILT   = 0.32;

export function TechOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const yawRef       = useRef(0);
  const pausedRef    = useRef(false);

  useEffect(() => {
    const N    = TECHS.length;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);

    const base = TECHS.map((_, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      };
    });

    const el = containerRef.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];

    const tick = () => {
      if (!pausedRef.current) yawRef.current += SPEED;

      const cosY = Math.cos(yawRef.current);
      const sinY = Math.sin(yawRef.current);

      base.forEach((p, i) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y1 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;

        const depth   = (z2 + 1) / 2;
        const scale   = 0.52 + depth * 0.58;
        const opacity = 0.18 + depth * 0.82;

        const item = items[i];
        if (!item) return;

        item.style.transform = `translate(calc(-50% + ${(x1 * RADIUS).toFixed(1)}px), calc(-50% + ${(y1 * RADIUS).toFixed(1)}px)) scale(${scale.toFixed(3)})`;
        item.style.opacity   = opacity.toFixed(3);
        item.style.zIndex    = String(Math.round(depth * 100));
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="relative w-[300px] h-[300px] flex items-center justify-center"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Nucleus glows */}
      <div className="absolute w-36 h-36 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute w-20 h-20 rounded-full bg-secondary-foreground/10 blur-2xl pointer-events-none" />

      {/* Orbiting pills */}
      <div ref={containerRef} className="absolute inset-0">
        {TECHS.map(({ name, Icon }) => (
          <div
            key={name}
            className="absolute left-1/2 top-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/80 border border-primary/20 text-xs font-semibold text-foreground backdrop-blur-sm whitespace-nowrap cursor-default select-none"
            style={{ willChange: "transform, opacity" }}
          >
            <Icon size={11} className="text-primary shrink-0" />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
