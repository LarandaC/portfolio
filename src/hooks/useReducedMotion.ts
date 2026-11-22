import { useSyncExternalStore } from "react";

const media = window.matchMedia("(prefers-reduced-motion: reduce)");

function subscribe(onChange: () => void) {
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Follows the user's reduced-motion setting live. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => media.matches, () => false);
}
