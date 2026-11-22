import { cva, type VariantProps } from "class-variance-authority";

/** Look only; padding and layout stay with each use. */
export const cardVariants = cva("", {
  variants: {
    variant: {
      surface: "overflow-hidden rounded-[20px] border border-line bg-surface",
      frosted:
        "rounded-[22px] border border-line bg-surface/88 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-300 hover:border-pill-hover hover:shadow-lift-lg",
      tile: "rounded-[18px] border border-line bg-surface/85 backdrop-blur-[6px] transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-pill-hover hover:shadow-lift",
      sheet: "rounded-[28px] border border-line bg-surface/92 shadow-[0_30px_60px_rgba(10,20,60,.18)] backdrop-blur-[14px]",
      /** "Ticket" with notches cut from its sides. */
      ticket:
        "rounded-[22px] bg-brand-soft [mask:radial-gradient(circle_17px_at_0_55%,#0000_97%,#000)_left/51%_100%_no-repeat,radial-gradient(circle_17px_at_100%_55%,#0000_97%,#000)_right/51%_100%_no-repeat]",
    },
  },
  defaultVariants: { variant: "surface" },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;
