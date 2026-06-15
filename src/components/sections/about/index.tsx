import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AboutHeader } from "./components/AboutHeader";
import { AboutBio } from "./components/AboutBio";
import { ServiceList } from "./components/ServiceList";

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden bg-background">
      <span aria-hidden className="absolute select-none pointer-events-none font-family-display font-bold leading-none about-ghost-number">
        01
      </span>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none section-top-border" />
      <div aria-hidden className="absolute bottom-0 right-0 pointer-events-none about-ambient-glow" />

      <div className="max-w-6xl mx-auto relative z-[1]">
        <RevealOnScroll>
          <AboutHeader />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-16 items-start">
            <AboutBio />
            <ServiceList />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default AboutSection;
