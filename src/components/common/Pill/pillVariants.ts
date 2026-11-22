import { cva, type VariantProps } from "class-variance-authority";

/** Small rounded label: section numbers, tags, roles, map place names. */
export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[11px] font-medium tracking-[.01em]",
  {
    variants: {
      tone: {
        default: "bg-pill text-pill-ink",
        /** Highlighted (e.g. the place Amaru is at). */
        active: "bg-brand text-on-brand",
        /** Over a photo or screenshot, where the soft pill colour would disappear. */
        onImage: "bg-white/88 text-pill-ink",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export type PillVariantProps = VariantProps<typeof pillVariants>;
