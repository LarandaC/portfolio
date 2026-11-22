import { useMapStore } from "@/components/world/useMapStore";
import { IntroContent } from "./panels/IntroContent";

/** Welcome card shown on arrival, over the map's lower left, until the visitor starts exploring. */
export function MapIntro() {
  const open = useMapStore((s) => s.introOpen && s.ready && !s.panel);
  if (!open) return null;

  return (
    <section
      aria-label="Leticia Aranda"
      className="fixed bottom-16 left-6 z-30 w-[min(520px,calc(100%-32px))] rounded-[28px] border border-line bg-surface/92 p-7 shadow-[0_30px_60px_rgba(10,20,60,.18)] backdrop-blur-[14px] max-tablet:inset-x-2 max-tablet:bottom-2 max-tablet:w-auto max-tablet:p-5"
    >
      <IntroContent />
    </section>
  );
}
