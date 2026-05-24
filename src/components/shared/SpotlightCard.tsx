import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  tiltAmount?: number;
}

const SPRING_CFG = { stiffness: 280, damping: 22, mass: 0.6 };

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(139, 92, 246, 0.18)",
  tiltAmount = 7,
}) => {
  const cardRef   = useRef<HTMLDivElement>(null);
  const spotRef   = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  /* ── Motion values for tilt ─────────────────────────────── */
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const springX = useSpring(rawX, SPRING_CFG);
  const springY = useSpring(rawY, SPRING_CFG);

  const rotateX = useTransform(springY, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [0, 1], [-tiltAmount, tiltAmount]);

  /* ── Direct DOM mutations — zero React re-renders ───────── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Normalised 0-1 for spring tilt
      rawX.set(x / width);
      rawY.set(y / height);

      // Spotlight radial glow
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${spotlightColor}, transparent 70%)`;
      }

      // Border highlight — radial gradient masked to 1px perimeter
      if (borderRef.current) {
        borderRef.current.style.background = `radial-gradient(circle 130px at ${x}px ${y}px, hsl(var(--primary) / 0.65), transparent)`;
      }
    },
    [rawX, rawY, spotlightColor]
  );

  const handleMouseEnter = useCallback(() => {
    if (spotRef.current)   spotRef.current.style.opacity   = "1";
    if (borderRef.current) borderRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
    if (spotRef.current)   spotRef.current.style.opacity   = "0";
    if (borderRef.current) borderRef.current.style.opacity = "0";
  }, [rawX, rawY]);

  return (
    /* Outer wrapper carries the 3D tilt — no overflow:hidden so perspective is clean */
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 700 }}
      className="rounded-xl will-change-transform"
    >
      {/* Inner card — clips gradients to rounded bounds */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative rounded-xl border border-border/70 bg-card overflow-hidden cursor-default",
          className
        )}
      >
        {/* 1 — Border highlight (masked to 1 px perimeter) */}
        <div
          ref={borderRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
          style={{
            padding: "1px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
          }}
        />

        {/* 2 — Spotlight radial glow */}
        <div
          ref={spotRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        />

        {/* 3 — Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
