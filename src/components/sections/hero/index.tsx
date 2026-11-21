// import { HeroClouds } from "./components/HeroClouds";
import { HeroContent } from "./components/HeroContent";
import { HeroMedia } from "./components/HeroMedia";
import { HeroGlass } from "./components/HeroGlass";
import { lazy } from "react";
import { PetalLayer } from "@/components/shared/three/PetalLayer";

// Mist + petals depth scene; lazy so three.js stays out of the main chunk.
const HeroScene = lazy(() => import("./components/HeroScene"));

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="hero force-light relative h-screen min-h-[620px] overflow-hidden bg-surface max-tablet:h-svh max-tablet:min-h-[560px]"
    >
      {/* 
      <HeroClouds />
      */}
      <HeroContent />
      <HeroMedia />
      <PetalLayer className="z-4" count={190} scene={HeroScene} />
      <HeroGlass />
    </section>
  );
};

export default HeroSection;
