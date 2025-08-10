import { Footer } from "../components/Footer";
import { NotFoundSection } from "../components/NotFoundSection";
import { StarBackground } from "../components/StarBackground";
import { ThemeToggle } from "../components/ThemeToggle";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <main>
        <NotFoundSection />
      </main>
      <Footer />
    </div>
  );
};
