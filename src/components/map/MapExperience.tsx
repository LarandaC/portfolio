import { lazy, Suspense, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { mapStore } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { STATION_HASH, stationFromHash } from "./const/stationSections";
import { MapHud } from "./MapHud";
import { MapIntro } from "./MapIntro";
import { MapPanel } from "./MapPanel";
import { MapEnterPrompt } from "./MapEnterPrompt";
import { MapLoader } from "./MapLoader";

const WorldScene = lazy(() => import("@/components/world/WorldScene"));

/**
 * The portfolio as an explorable valley: the 3D map fills the screen and the DOM interface floats on top.
 * The URL hash names the open place (#projects, #contact…), so links and the back button work.
 */
export function MapExperience() {
  const { theme } = useTheme();
  const panel = useMapStore((s) => s.panel);

  // The classic page's zoom-out intro doesn't apply here.
  useEffect(() => {
    document.body.classList.remove("intro");
  }, []);

  // Dark theme = night in the valley.
  useEffect(() => {
    mapStore.set({ night: theme === "dark" });
  }, [theme]);

  // #hash → walk to that place (also catches in-content links like "Ponte en contacto" → #contact).
  useEffect(() => {
    const go = () => {
      const id = stationFromHash(window.location.hash);
      if (id && id !== mapStore.get().panel) mapStore.goTo(id);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);

  // Keep the hash in step with the open place, without adding history entries.
  useEffect(() => {
    const hash = panel ? `#${STATION_HASH[panel]}` : "";
    if (window.location.hash !== hash) history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [panel]);

  return (
    <main className="fixed inset-0 overflow-hidden bg-surface">
      <div className="absolute inset-0" aria-hidden>
        <Suspense fallback={null}>
          <WorldScene />
        </Suspense>
      </div>
      <MapHud />
      <MapIntro />
      <MapPanel />
      <MapEnterPrompt />
      <MapLoader />
    </main>
  );
}
