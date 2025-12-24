import Particles from "@/components/shared/Particles";
import { NotFoundSection } from "../components/sections/NotFoundSection";
import { ThemeToggle } from "../theme/ThemeToggle";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          particleCount={200}
          particleSpread={12}
          speed={0.1}
          particleColors={["#ffffff", "#8B5CF6", "#D946EF"]}
          particleHoverFactor={2}
          alphaParticles={true}
          particleBaseSize={150}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      <div className="relative z-10">
        <div className="hidden sm:block fixed bottom-5 right-5 z-50">
          <ThemeToggle />
        </div>
        <main>
          <NotFoundSection />
        </main>
      </div>
    </div>
  );
};
