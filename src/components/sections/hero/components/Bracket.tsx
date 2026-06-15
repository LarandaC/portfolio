import type { RefObject } from "react";
import { GOLD, TICK_Y, VIOLET } from "../const/constants";

export interface BracketProps {
  side:   "left" | "right";
  divRef: RefObject<HTMLDivElement>;
}

export function Bracket({ side, divRef }: BracketProps) {
  const isLeft  = side === "left";
  const anchor = isLeft ? 8 : 64;
  const tip     = isLeft ? 56 : 16;
  const tickEnd = isLeft ? 26 : 46;

  return (
    <div
      ref={divRef}
      className={`absolute ${isLeft ? "left-6 xl:left-20" : "right-6 xl:right-20"} top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block will-change-transform`}
    >
      <svg width="72" height="210" viewBox="0 0 72 210" fill="none">
        <path
          d={`M${tip} 8 L${anchor} 8 L${anchor} 202 L${tip} 202`}
          stroke={`hsl(${GOLD} / 0.32)`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={anchor} cy="8"   r="3"   fill={`hsl(${GOLD} / 0.65)`} />
        <circle cx={anchor} cy="202" r="3"   fill={`hsl(${GOLD} / 0.65)`} />

        {TICK_Y.map((y) => (
          <g key={y}>
            <line
              x1={anchor} y1={y}
              x2={tickEnd} y2={y}
              stroke={`hsl(${VIOLET} / 0.38)`}
              strokeWidth="1"
            />
            <circle cx={anchor} cy={y} r="1.5" fill={`hsl(${VIOLET} / 0.6)`} />
          </g>
        ))}
      </svg>
    </div>
  );
}
