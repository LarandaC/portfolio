import type { StationId } from "@/components/world/const/worldLayout";

/**
 * Map station ↔ URL hash. The hashes are the classic page's section ids, so existing links
 * (e.g. "Ponte en contacto" → #contact) walk Amaru to that building instead.
 */
export const STATION_HASH: Record<StationId, string> = {
  inicio: "hero",
  about: "about",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  contact: "contact",
};

export const stationFromHash = (hash: string): StationId | null => {
  const id = hash.replace(/^#/, "");
  const entry = Object.entries(STATION_HASH).find(([, h]) => h === id);
  return (entry?.[0] as StationId | undefined) ?? null;
};
