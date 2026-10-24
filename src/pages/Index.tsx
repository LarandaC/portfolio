import { lazy, Suspense, useCallback, useState } from "react";
import { NavBar } from "@/components/layout/NavBar/NavBar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsSection } from "@/components/sections/projects";
import { OnMount } from "@/components/shared/OnMount";
import { usePageMotion } from "@/hooks/usePageMotion";
import { HERO_POSTER } from "@/lib/media";

// Below-the-fold sections are split out; they download while the intro plays.
const SkillsSection = lazy(() => import("@/components/sections/skills"));
const ExperienceSection = lazy(() => import("@/components/sections/experience"));
const ContactSection = lazy(() => import("@/components/sections/contact"));

export const Index = () => {
  const [sectionsReady, setSectionsReady] = useState(false);
  const introDone = usePageMotion(sectionsReady);
  const markSectionsReady = useCallback(() => setSectionsReady(true), []);

  return (
    <>
      {/* Blurred landscape the page zooms out of on load */}
      {!introDone && (
        <div
          className="fixed -inset-10 z-0 scale-[1.3] bg-cover bg-[position:center_70%] blur-[18px] saturate-[1.1]"
          style={{ backgroundImage: `url(${HERO_POSTER})` }}
          aria-hidden
        />
      )}

      <div
        id="app"
        className="relative z-1 origin-[50%_50vh] overflow-clip bg-surface intro:rounded-[28px] intro:[transform:scale(.9)]"
      >
        <NavBar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <Suspense fallback={null}>
            <SkillsSection />
            <ExperienceSection />
            <ContactSection />
            <OnMount onMount={markSectionsReady} />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};
