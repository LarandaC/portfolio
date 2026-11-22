import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { pillVariants, type PillVariantProps } from "./pillVariants";

type PillProps = PillVariantProps & HTMLAttributes<HTMLElement>;

/** A small rounded label. With `onClick` it becomes a `<button>` (e.g. clickable place names on the map). */
export function Pill({ tone, className, ...props }: PillProps) {
  const classes = cn(pillVariants({ tone }), className);
  if (props.onClick) return <button type="button" className={cn(classes, "cursor-pointer")} {...props} />;
  return <span className={classes} {...props} />;
}
