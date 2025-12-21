import { lazy } from "react";
import { NavBar } from "../components/layout/NavBar/NavBar";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { Footer } from "@/components/layout/Footer";

const HeroSection = lazy(() => import("../components/sections/HeroSection"));
const ProjectsSection = lazy(
  () => import("../components/sections/ProjectsSection")
);
const Particles = lazy(() => import("@/components/shared/Particles"));
const ContactSection = lazy(
  () => import("../components/sections/ContactSection")
);

export const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={200}
          particleSpread={12}
          speed={0.5}
          particleColors={["#ffffff", "#8B5CF6", "#D946EF"]}
          particleHoverFactor={2}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={0.5}
          cameraDistance={25}
          disableRotation={true}
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10">
        <NavBar />
        <ThemeToggle />
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
