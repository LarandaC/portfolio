import { StarBackground } from "../components/shared/StarBackground";
import { NavBar } from "../components/layout/NavBar/NavBar";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/layout/Footer";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { Box } from "@mui/material";

export const Index = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
          overflowX: "hidden",
          position: "relative",
        }}
      >
        <ProgressBar />
        <StarBackground />
        <NavBar />

        <Box component="main">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </Box>

        <Footer />
      </Box>
    </>
  );
};
