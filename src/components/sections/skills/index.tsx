import { CLOUD_B } from "@/lib/media";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SquareField } from "@/components/shared/SquareField";
import { DriftCloud } from "@/components/shared/DriftCloud";
import { useSkillsFilter } from "./hooks/useSkillsFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import { SkillGrid } from "./components/SkillGrid";

export function SkillsSection() {
  const { activeCategory, animKey, filteredSkills, handleCategoryChange, gridWrapperRef } =
    useSkillsFilter();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-surface px-4 pt-[150px] pb-[130px] max-tablet:pt-[120px] max-tablet:pb-[90px]"
    >
      <SquareField count={16} />
      <DriftCloud
        src={CLOUD_B}
        className="absolute top-10 -right-[6vw] z-1 w-[min(34vw,480px)] max-tablet:top-5 max-tablet:-right-[18vw] max-tablet:w-[60vw]"
        drift="b"
      />

      <div className="relative z-2 mx-auto max-w-[1000px]">
        <SectionHeader label="03 · Skills" title={["Skills"]} />
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
        <SkillGrid skills={filteredSkills} animKey={animKey} gridWrapperRef={gridWrapperRef} />
      </div>
    </section>
  );
}

export default SkillsSection;
