/** Models available in the dev-only /lab page. Files come from `npm run models` (public/models). */
export type LabModel = {
  id: string;
  name: string;
  kind: "cat" | "building";
  file: string;
  author: string;
  license: string;
};

export const LAB_MODELS: LabModel[] = [
  { id: "cat-evil-katz", name: "An Animated Cat", kind: "cat", file: "/models/cat-evil-katz.glb", author: "Evil_Katz", license: "CC-BY 4.0" },
  { id: "cat-madtrollstudio", name: "Cat", kind: "cat", file: "/models/cat-madtrollstudio.glb", author: "madtrollstudio", license: "CC-BY" },
  { id: "cat-volkanongun", name: "Low Poly Cat", kind: "cat", file: "/models/cat-volkanongun.glb", author: "volkanongun", license: "CC-BY 4.0" },
  { id: "cat-tuxedo-dreamnoms", name: "Tuxedo Cat Animated 2.0", kind: "cat", file: "/models/cat-tuxedo-dreamnoms.glb", author: "DreamNoms", license: "CC-BY 4.0" },
  { id: "cat-somali-dreamnoms", name: "Somali Cat Animated 1.2", kind: "cat", file: "/models/cat-somali-dreamnoms.glb", author: "DreamNoms", license: "CC-BY 4.0" },
  { id: "cat-volkanongun-walk", name: "Low Poly Cat Walk", kind: "cat", file: "/models/cat-volkanongun-walk.glb", author: "volkanongun", license: "CC-BY 4.0" },
  { id: "pagoda", name: "Pagoda", kind: "building", file: "/models/pagoda.glb", author: "Poly by Google", license: "CC-BY" },
  { id: "house-daniel-stringer", name: "Japanese House", kind: "building", file: "/models/house-daniel-stringer.glb", author: "Daniel Stringer", license: "CC-BY 4.0" },
  { id: "house-ig-shero", name: "Japanese House", kind: "building", file: "/models/house-ig-shero.glb", author: "IG_Shero", license: "CC-BY 4.0" },
  { id: "house-janab", name: "Simple Japanese House 2", kind: "building", file: "/models/house-janab.glb", author: "JanaB", license: "CC-BY 4.0" },
  { id: "shrine-wolvemancer", name: "Japanese Shrine", kind: "building", file: "/models/shrine-wolvemancer.glb", author: "Wolvemancer", license: "CC-BY 4.0" },
  { id: "bell-tower", name: "Japanese Bell Tower", kind: "building", file: "/models/bell-tower-ao-interactive.glb", author: "AO-INTERACTIVE", license: "CC-BY 4.0" },
  { id: "maple", name: "Japanese Maple Tree", kind: "building", file: "/models/maple-olivermathegames.glb", author: "OliverMatheGames", license: "CC-BY 4.0" },
  { id: "stone-lantern", name: "Japanese Stone Lantern", kind: "building", file: "/models/stone-lantern-sahir-virmani.glb", author: "Sahir Virmani", license: "CC-BY 4.0" },
];

/** Sidebar entry that shows every cat side by side. */
export const COMPARE_ID = "compare-cats";

/** Backdrops to judge a model under the world's light: one per time of day in the storyboard. */
export const LAB_SKIES = [
  { id: "dawn", label: "Amanecer", top: "#f6b38a", bottom: "#c9b8f5", light: "#ffd2a8", intensity: 2.2 },
  { id: "day", label: "Mediodía", top: "#8ec5f0", bottom: "#e8f3fb", light: "#ffffff", intensity: 2.6 },
  { id: "dusk", label: "Atardecer", top: "#7c5cd6", bottom: "#f3a6c0", light: "#ffb48a", intensity: 2 },
  { id: "night", label: "Noche", top: "#0f1640", bottom: "#3a3f8f", light: "#b9c6ff", intensity: 1.2 },
] as const;

export type LabSky = (typeof LAB_SKIES)[number];
