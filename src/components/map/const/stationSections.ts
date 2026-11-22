import type { StationId } from "@/components/world/const/worldLayout";

/** Station ↔ hash, using the classic page's section ids so its links work on the map. */
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
