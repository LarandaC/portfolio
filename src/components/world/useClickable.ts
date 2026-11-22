import { useState } from "react";
import { useCursor } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

/** Hover cursor and a click that doesn't reach the ground behind; inert without `onSelect`. */
export function useClickable(onSelect?: () => void) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !!onSelect);
  if (!onSelect) return {};
  return {
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect();
    },
    onPointerOver: () => setHovered(true),
    onPointerOut: () => setHovered(false),
  };
}
