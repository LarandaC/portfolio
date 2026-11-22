import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { STATIONS } from "@/components/world/const/worldLayout";
import { mapStore } from "@/components/world/mapStore";
import { useMapStore } from "@/components/world/useMapStore";
import { IntroContent } from "./panels/IntroContent";
import { AboutPanel } from "./panels/AboutPanel";
import { ProjectsPanel } from "./panels/ProjectsPanel";
import { SkillsPanel } from "./panels/SkillsPanel";
import { ExperiencePanel } from "./panels/ExperiencePanel";
import { ContactPanel } from "./panels/ContactPanel";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Pill } from "@/components/common/Pill";

const CONTENT = {
  inicio: IntroContent,
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  experience: ExperiencePanel,
  contact: ContactPanel,
};

/** Side panel / bottom sheet. Not modal: walking away or Esc closes it. */
export function MapPanel() {
  const { t } = useTranslation();
  const panel = useMapStore((s) => s.panel);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!panel) return;
    heading.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && mapStore.set({ panel: null });
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  if (!panel) return null;
  const index = STATIONS.findIndex((s) => s.id === panel);
  const Content = CONTENT[panel];

  return (
    <Card
      as="aside"
      variant="sheet"
      role="dialog"
      aria-labelledby="map-panel-title"
      className="fixed top-4 right-4 z-30 flex max-h-[calc(100svh-96px)] w-[min(560px,calc(100%-32px))] flex-col overflow-hidden max-tablet:top-auto max-tablet:right-2 max-tablet:bottom-2 max-tablet:left-2 max-tablet:max-h-[72svh] max-tablet:w-auto"
    >
      <header className="flex items-center gap-3 border-b border-line px-6 py-4">
        <Pill>{`0${index} · ${t(STATIONS[index].labelKey)}`}</Pill>
        <h2 id="map-panel-title" ref={heading} tabIndex={-1} className="sr-only">
          {t(STATIONS[index].labelKey)}
        </h2>
        <Button variant="icon" className="ml-auto" onClick={() => mapStore.set({ panel: null })} aria-label={t("map.close")}>
          <X className="size-4" />
        </Button>
      </header>
      {/* @container: sections adapt to the panel's width. */}
      <div className="@container overflow-y-auto overscroll-contain px-6 pt-6 pb-8">
        <Content />
      </div>
    </Card>
  );
}
