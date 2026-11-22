import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type Ref } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonVariantProps } from "./buttonVariants";

type AsButton = ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined };
type AsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  to?: undefined;
  /** Opens in a new tab, safely (target="_blank" + rel="noopener noreferrer"). */
  external?: boolean;
};
type AsRouterLink = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; href?: undefined };

export type ButtonProps = ButtonVariantProps & (AsButton | AsAnchor | AsRouterLink);

/**
 * The portfolio's button. Renders what the props call for:
 * - `<Button onClick>` → `<button type="button">`
 * - `<Button href external>` → `<a>` (new tab when `external`)
 * - `<Button to="/simple">` → a router `<Link>` (no page reload)
 * Pick the look with `variant`: primary, ghost, icon, chip or link.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant, className, ...props },
  ref
) {
  const classes = cn(buttonVariants({ variant }), className);

  if (props.to !== undefined) {
    return <Link ref={ref as Ref<HTMLAnchorElement>} className={classes} {...props} />;
  }
  if (props.href !== undefined) {
    const { external, ...anchor } = props as AsAnchor;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...anchor}
      />
    );
  }
  return <button ref={ref as Ref<HTMLButtonElement>} type="button" className={classes} {...(props as AsButton)} />;
});
