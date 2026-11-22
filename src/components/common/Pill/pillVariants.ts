import { cva, type VariantProps } from "class-variance-authority";

export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[11px] font-medium tracking-[.01em]",
  {
    variants: {
      tone: {
        default: "bg-pill text-pill-ink",
        active: "bg-brand text-on-brand",
        /** Over photos, where the soft colour disappears. */
        onImage: "bg-white/88 text-pill-ink",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export type PillVariantProps = VariantProps<typeof pillVariants>;
