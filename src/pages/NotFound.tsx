import { useEffect } from "react";
import { NotFoundSection } from "../components/sections/NotFoundSection";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export const NotFound = () => {
  // The zoom-out intro only runs on the home page.
  useEffect(() => {
    document.body.classList.remove("intro");
  }, []);

  return (
    <main>
      <NotFoundSection />
      <div className="fixed right-[18px] bottom-[18px] z-50 flex items-center gap-1.5">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </main>
  );
};
