import { useState } from "react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { skills } from "@/lib/skills";
import type { IconNames } from "@/hooks/use-icon";
import * as MuiIcons from "@mui/icons-material";
import SpotlightCard from "../shared/SpotlightCard";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

// filtro
const categoryData = [
  { id: "todos", label: "skills.categories.all" },
  { id: "frontend", label: "skills.categories.frontend" },
  { id: "backend", label: "skills.categories.backend" },
  { id: "herramientas", label: "skills.categories.tools" },
];

const DynamicMuiIcon = ({
  name,
  fontSize = 24,
}: {
  name: IconNames;
  fontSize?: number;
}) => {
  let IconComponent = MuiIcons[name];

  if (name.toLowerCase() === "github") {
    IconComponent = MuiIcons.GitHub;
  }

  if (!IconComponent) {
    return <MuiIcons.CodeRounded sx={{ fontSize, color: "text.primary" }} />;
  }

  return <IconComponent sx={{ fontSize }} />;
};

export const SkillsSection = () => {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState(0);
  const currentCategoryName = categoryData[activeCategory].id;
  const filteredSkills = skills.filter(
    (skill) =>
      currentCategoryName === "todos" || skill.category === currentCategoryName
  );

  return (
    <section id="skills" className="relative py-28 px-4 ">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-family-title">
            Skills
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4 mb-10" />
          </h2>

          {/* Tabs  */}
          <div className="flex justify-center mb-8 flex-wrap gap-2">
            {categoryData.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer
        capitalize 
        ${
          activeCategory === index
            ? "text-primary-foreground shadow-lg bg-gradient-to-r from-primary to-secondary-foreground"
            : "bg-card border border-border text-foreground hover:bg-primary/10"
        }`}
              >
                {t(category.label)}
              </button>
            ))}
          </div>

          {/* Grid de skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill, index) => (
              <SpotlightCard
                key={index}
                spotlightColor="rgba(102, 36, 168, 0.2)"
              >
                <div className="flex items-center justify-between p-3">
                  <div className="flex flex-col">
                    <h3 className="font-semibold mb-1 text-left">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-foreground/70 text-left">
                      {skill[i18n.language.includes("en") ? "en" : "es"]}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-full flex items-center justify-center bg-primary/10 transition-all duration-300 skill-icon">
                    <DynamicMuiIcon name={skill.icon} fontSize={42} />
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
