import type { MeshStandardMaterial } from "three";

/** Emissive model materials (ModelBuilding adds, NightGlow drives). A Set: clones share materials. */
export const glowMaterials = new Set<MeshStandardMaterial>();
