import { useMapStore } from "@/components/world/useMapStore";
import { Card } from "@/components/common/Card";
import { IntroContent } from "./panels/IntroContent";

/** Welcome card shown on arrival, over the map's lower left, until the visitor starts exploring. */
export function MapIntro() {
  const open = useMapStore((s) => s.introOpen && s.ready && !s.panel);
  if (!open) return null;

  return (
    <Card
      as="section"
      variant="sheet"
      aria-label="Leticia Aranda"
      className="fixed bottom-16 left-6 z-30 w-[min(520px,calc(100%-32px))] p-7 max-tablet:inset-x-2 max-tablet:bottom-2 max-tablet:w-auto max-tablet:p-5"
    >
      <IntroContent />
    </Card>
  );
}
