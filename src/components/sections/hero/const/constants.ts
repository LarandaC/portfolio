export const GOLD   = "38 80% 55%";
export const VIOLET = "262 70% 60%";
export const TICK_Y = [72, 105, 138] as const;

interface StarDatum {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  glow: boolean;
}

const mkStars = (n: number, sMin: number, sMax: number): StarDatum[] =>
  Array.from({ length: n }, (_, i) => ({
    id: i,
    top:     `${(Math.random() * 96 + 2).toFixed(2)}%`,
    left:    `${(Math.random() * 96 + 2).toFixed(2)}%`,
    size:    +(sMin + Math.random() * (sMax - sMin)).toFixed(2),
    opacity: +(0.25 + Math.random() * 0.75).toFixed(2),
    glow:    Math.random() > 0.72,
  }));

export type { StarDatum };

export const STARS_FAR  = mkStars(75, 0.5, 1.1);
export const STARS_MID  = mkStars(38, 1.0, 2.0);
export const STARS_NEAR = mkStars(14, 1.5, 3.0);
