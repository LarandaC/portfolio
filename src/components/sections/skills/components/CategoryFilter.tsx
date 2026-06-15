import { useTranslation } from "react-i18next";
import { categoryData, categoryCounts } from "../const/constants";
import { FilterButton } from "./FilterButton";

interface CategoryFilterProps {
  activeCategory:   number;
  onCategoryChange: (index: number) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {categoryData.map((cat, index) => (
        <FilterButton
          key={cat.id}
          icon={cat.icon}
          label={t(cat.label)}
          count={categoryCounts[cat.id]}
          isActive={activeCategory === index}
          onClick={() => onCategoryChange(index)}
        />
      ))}
    </div>
  );
}
