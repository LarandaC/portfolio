import { useLayoutEffect, useState, type RefObject } from "react";
import { useTheme } from "./useTheme";

/** Resolves `--color-*` tokens from an element (so `force-light` applies); re-reads on theme change. */
export function useCssColors<K extends string>(ref: RefObject<HTMLElement>, tokens: Record<K, string>) {
  const { theme } = useTheme();
  const [colors, setColors] = useState<Record<K, string> | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // A probe resolves var() chains to rgb().
    const probe = document.createElement("span");
    probe.style.display = "none";
    el.appendChild(probe);
    const resolved = {} as Record<K, string>;
    for (const name of Object.keys(tokens) as K[]) {
      probe.style.color = `var(--color-${tokens[name]})`;
      resolved[name] = getComputedStyle(probe).color;
    }
    probe.remove();
    setColors(resolved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, theme]);

  return colors;
}
