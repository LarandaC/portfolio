import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { cardVariants, type CardVariantProps } from "./cardVariants";

type CardProps = CardVariantProps &
  HTMLAttributes<HTMLElement> & {
    /** `article` for a self-contained item (a project, a job), `div` otherwise. */
    as?: "article" | "div" | "section" | "aside";
  };

/** A card surface; pick the look with `variant` (surface, frosted, tile, ticket). */
export function Card({ variant, as: Tag = "div", className, ...props }: CardProps) {
  return <Tag className={cn(cardVariants({ variant }), className)} {...props} />;
}
