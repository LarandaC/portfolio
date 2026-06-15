import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { GOLD, VIOLET } from "./const/constants";
import { useHeroParallax } from "./hooks/useHeroParallax";
import { useScrollParallax } from "./hooks/useScrollParallax";
import { StarField } from "./components/StarField";
import { HeroBrackets } from "./components/HeroBrackets";
import { HeroContent } from "./components/HeroContent";
import { HeroGrid } from "./components/HeroGrid";

export const HeroSection = () => {
  const gridRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { farRef, midRef, nearRef, leftRef, rightRef } = useHeroParallax();
  useScrollParallax(gridRef, contentRef);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "hsl(222 55% 4%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, hsl(${GOLD} / 0.07) 0%, transparent 65%)`,
            filter:     "blur(60px)",
          }}
        />
        <div
          className="absolute -top-20 -left-32 w-[600px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, hsl(${VIOLET} / 0.1) 0%, transparent 65%)`,
            filter:     "blur(60px)",
          }}
        />
      </div>

      <StarField farRef={farRef} midRef={midRef} nearRef={nearRef} />
      <HeroBrackets leftRef={leftRef} rightRef={rightRef} />
      <HeroContent contentRef={contentRef} />
      <HeroGrid gridRef={gridRef} />

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center transition-colors duration-300"
        style={{ color: `hsl(${GOLD} / 0.35)` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = `hsl(${GOLD} / 0.75)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.color = `hsl(${GOLD} / 0.35)`;
        }}
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
        <ChevronDown
          className="w-5 h-5 animate-bounce -mt-3 opacity-50"
          style={{ animationDelay: "0.18s" }}
        />
      </a>
    </section>
  );
};

export default HeroSection;
