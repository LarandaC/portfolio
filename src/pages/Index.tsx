import { lazy } from "react";
import { SideNav } from "../components/layout/SideNav/SideNav";
import { AboutSection } from "../components/sections/about";
import { SkillsSection } from "../components/sections/skills";
import { Footer } from "@/components/layout/Footer";
import { useLenis } from "@/hooks/useLenis";
import { ScrollProgress } from "@/components/shared/ScrollProgress";

const HeroSection = lazy(() => import("@/components/sections/hero"));
const ProjectsSection = lazy(() => import("@/components/sections/projects"));
const Particles = lazy(() => import("@/components/shared/Particles"));
const ContactSection = lazy(() => import("@/components/sections/contact"));

export const Index = () => {
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <ScrollProgress />
      {/* Grain overlay — fixed film grain across the whole page */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" />
          </filter>
        </defs>
      </svg>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ filter: "url(#grain-filter)", opacity: 0.055, mixBlendMode: "overlay", background: "white", zIndex: 200 }}
        aria-hidden
      />

      {/* Subtle particles — reduced count, updated palette to match retro theme */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={90}
          particleSpread={12}
          speed={0.3}
          particleColors={["#ffffff", "#7D3DEF", "#C8820A"]}
          particleHoverFactor={1.5}
          alphaParticles={true}
          particleBaseSize={80}
          sizeRandomness={0.6}
          cameraDistance={28}
          disableRotation={true}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <SideNav />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};
