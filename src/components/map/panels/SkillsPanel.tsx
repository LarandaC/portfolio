import { useSkillsFilter } from "@/components/sections/skills/hooks/useSkillsFilter";
import { CategoryFilter } from "@/components/sections/skills/components/CategoryFilter";
import { SkillGrid } from "@/components/sections/skills/components/SkillGrid";

/** "Skills" inside the house: the same category filter and skill grid as the classic page. */
export function SkillsPanel() {
  const { activeCategory, animKey, filteredSkills, handleCategoryChange, gridWrapperRef } = useSkillsFilter();
  return (
    <div className="flex flex-col gap-4">
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <SkillGrid skills={filteredSkills} animKey={animKey} gridWrapperRef={gridWrapperRef} />
    </div>
  );
}
