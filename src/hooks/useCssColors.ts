import { useLayoutEffect, useState, type RefObject } from "react";
import { useTheme } from "./useTheme";

/**
 * Resolves `--color-*` tokens as seen from an element, so `force-light` zones get their light values.
 * Re-reads them when the theme changes. Returns rgb() strings.
 */
export function useCssColors<T extends string[]>(ref: RefObject<HTMLElement>, tokens: [...T]) {
  const { theme } = useTheme();
  const [colors, setColors] = useState<{ [K in keyof T]: string } | null>(null);
  const key = tokens.join(",");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A probe element lets the browser resolve var() chains and any color syntax to rgb().
    const probe = document.createElement("span");
    probe.style.display = "none";
    el.appendChild(probe);
    const resolved = key.split(",").map((token) => {
      probe.style.color = `var(--color-${token})`;
      return getComputedStyle(probe).color;
    });
    probe.remove();
    setColors(resolved as { [K in keyof T]: string });
  }, [ref, key, theme]);

  return colors;
}
