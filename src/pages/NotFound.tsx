import { NotFoundSection } from "../components/sections/NotFoundSection";
import { StarBackground } from "../components/shared/StarBackground";
import { ThemeToggle } from "../components/shared/ThemeToggle";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <main>
        <NotFoundSection />
      </main>
    </div>
  );
};
