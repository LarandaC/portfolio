import { lazy, Suspense, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { mapStore } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { STATION_HASH, stationFromHash } from "./const/stationSections";
import { MapHud } from "./MapHud";
import { MapIntro } from "./MapIntro";
import { MapPanel } from "./MapPanel";
import { MapEnterPrompt } from "./MapEnterPrompt";
import { MapLoader } from "./MapLoader";
import { MapErrorBoundary } from "./MapErrorBoundary";

const WorldScene = lazy(() => import("@/components/world/WorldScene"));

/**
 * The portfolio as an explorable valley: the 3D map fills the screen and the DOM interface floats on top.
 * The URL hash names the open place (#projects, #contact…), so links and the back button work.
 * If the scene fails, the visitor lands on the classic page (/simple) instead.
 */
export function MapExperience() {
  const { theme } = useTheme();
  const panel = useMapStore((s) => s.panel);
  const navigate = useNavigate();

  // If the 3D scene breaks (an error, or the GPU context is lost), continue on the classic page,
  // keeping the open place (#projects…). `replace`, so Back doesn't return to the broken map.
  const fallBack = useCallback(() => {
    navigate(`/simple${window.location.hash}`, { replace: true });
  }, [navigate]);

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
        <MapErrorBoundary onFail={fallBack}>
          <Suspense fallback={null}>
            <WorldScene onContextLost={fallBack} />
          </Suspense>
        </MapErrorBoundary>
      </div>
      <MapHud />
      <MapIntro />
      <MapPanel />
      <MapEnterPrompt />
      <MapLoader />
    </main>
  );
}
