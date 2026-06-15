import { lazy, Suspense } from "react";
import { NotFoundSection } from "../components/sections/NotFoundSection";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";

const Particles = lazy(() => import("@/components/shared/Particles"));

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Grain overlay */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="grain-filter-404">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" />
          </filter>
        </defs>
      </svg>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ filter: "url(#grain-filter-404)", opacity: 0.055, mixBlendMode: "overlay", background: "white", zIndex: 200 }}
        aria-hidden
      />

      {/* Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
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
        </Suspense>
      </div>

      {/* Controls */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="relative z-10">
        <main>
          <NotFoundSection />
        </main>
      </div>
    </div>
  );
};
