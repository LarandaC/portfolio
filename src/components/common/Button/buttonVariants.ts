import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "h-9 rounded-full bg-brand px-4 text-[13px] font-semibold tracking-[-.01em] text-on-brand shadow-btn transition-[translate,background-color] duration-300 hover:-translate-y-px hover:bg-brand-hover",
        ghost:
          "h-9 rounded-full border border-pill-border bg-surface/70 px-4 text-[13px] font-semibold tracking-[-.01em] text-pill-ink transition-[translate,background-color,border-color] duration-300 hover:-translate-y-px hover:border-brand-soft hover:bg-surface",
        /** Needs an aria-label. */
        icon: "size-[34px] rounded-full bg-pill text-brand transition-colors duration-[250ms] hover:bg-brand hover:text-on-brand",
        chip: "rounded-full bg-surface/85 px-3 py-1.5 text-xs text-body shadow-nav backdrop-blur-[6px]",
        link: "underline hover:opacity-70",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
