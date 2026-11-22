import { cva, type VariantProps } from "class-variance-authority";

/** Card surfaces. Padding and layout stay with each use; the card only sets the look. */
export const cardVariants = cva("", {
  variants: {
    variant: {
      /** Solid surface with a hairline border (project cards in the map panel). */
      surface: "overflow-hidden rounded-[20px] border border-line bg-surface",
      /** Frosted: lets the background through, lifts on hover (timeline entries). */
      frosted:
        "rounded-[22px] border border-line bg-surface/88 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-300 hover:border-pill-hover hover:shadow-lift-lg",
      /** Small frosted tile that rises on hover (skills grid). */
      tile: "rounded-[18px] border border-line bg-surface/85 backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-pill-hover hover:shadow-lift",
      /** Soft-brand "ticket" with two semicircular notches cut from its sides (services). */
      ticket:
        "rounded-[22px] bg-brand-soft [mask:radial-gradient(circle_17px_at_0_55%,#0000_97%,#000)_left/51%_100%_no-repeat,radial-gradient(circle_17px_at_100%_55%,#0000_97%,#000)_right/51%_100%_no-repeat]",
    },
  },
  defaultVariants: { variant: "surface" },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;
