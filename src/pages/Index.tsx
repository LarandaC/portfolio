import { ThemeToggle } from "../components/shared/ThemeToggle";
import { StarBackground } from "../components/shared/StarBackground";
import { NavBar } from "../components/layout/NavBar";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";
import { ProgressBar } from "@/components/layout/ProgressBar";

export const Index = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ProgressBar />
        <ThemeToggle />
        <StarBackground />
        <NavBar />
        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};
