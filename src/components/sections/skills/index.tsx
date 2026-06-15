import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { useSkillsFilter } from "./hooks/useSkillsFilter";
import { SkillsHeader } from "./components/SkillsHeader";
import { CategoryFilter } from "./components/CategoryFilter";
import { SkillGrid } from "./components/SkillGrid";

export function SkillsSection() {
  const { activeCategory, animKey, filteredSkills, handleCategoryChange, gridWrapperRef } =
    useSkillsFilter();

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden bg-background">
      <span aria-hidden className="absolute select-none pointer-events-none font-family-display font-bold leading-none skills-ghost-number">
        02
      </span>
      <div aria-hidden className="absolute top-0 left-0 right-0 h-px pointer-events-none section-top-border" />
      <div aria-hidden className="absolute top-20 left-0 pointer-events-none skills-ambient-glow" />

      <div className="max-w-6xl mx-auto relative z-[1]">
        <RevealOnScroll>
          <SkillsHeader />
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </RevealOnScroll>
        <SkillGrid
          skills={filteredSkills}
          animKey={animKey}
          gridWrapperRef={gridWrapperRef}
        />
      </div>
    </section>
  );
}

export default SkillsSection;
