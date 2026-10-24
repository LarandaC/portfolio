import { HeroClouds } from "./components/HeroClouds";
import { HeroContent } from "./components/HeroContent";
import { HeroMedia } from "./components/HeroMedia";
import { HeroGlass } from "./components/HeroGlass";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="hero force-light relative h-screen min-h-[620px] overflow-hidden bg-surface max-tablet:h-svh max-tablet:min-h-[560px]"
    >
      <HeroClouds />
      <HeroContent />
      <HeroMedia />
      <HeroGlass />
    </section>
  );
};

export default HeroSection;
