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
import { MapSlowNotice } from "./MapSlowNotice";

const WorldScene = lazy(() => import("@/components/world/WorldScene"));

/** The 3D map with the DOM UI on top. The hash names the open place; if the scene fails, go to /simple. */
export function MapExperience() {
  const { theme } = useTheme();
  const place = useMapStore((s) => s.panel ?? s.target);
  const navigate = useNavigate();

  // `replace`, so Back doesn't return to the broken map.
  const fallBack = useCallback(() => {
    navigate(`/simple${window.location.hash}`, { replace: true });
  }, [navigate]);

  useEffect(() => {
    document.body.classList.remove("intro");
  }, []);

  useEffect(() => {
    mapStore.set({ night: theme === "dark" });
  }, [theme]);

  // Also catches in-content links like #contact.
  useEffect(() => {
    const go = () => {
      const id = stationFromHash(window.location.hash);
      const { panel, target } = mapStore.get();
      if (id && id !== panel && id !== target) mapStore.goTo(id);
    };
    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);

  // Sync the hash without adding history entries.
  useEffect(() => {
    const hash = place ? `#${STATION_HASH[place]}` : "";
    if (window.location.hash !== hash) history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [place]);

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
      <MapSlowNotice />
      <MapLoader />
    </main>
  );
}
