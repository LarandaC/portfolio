import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExperienceHeader } from "./components/ExperienceHeader";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden bg-background">
      <span aria-hidden className="absolute select-none pointer-events-none font-family-display font-bold leading-none experience-ghost-number">
        02
      </span>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none section-top-border" />
      <div aria-hidden className="absolute bottom-0 left-0 pointer-events-none experience-ambient-glow" />

      <div className="max-w-6xl mx-auto relative z-[1]">
        <RevealOnScroll>
          <ExperienceHeader />
          <ExperienceTimeline entries={experiences} />
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default ExperienceSection;
