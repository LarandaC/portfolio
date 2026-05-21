import { useState } from "react";
import {
  Atom, Braces, Code2, Database, FileCode2,
  Figma, Github, LayoutDashboard, MousePointer2,
  Paintbrush, Server, Triangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { skills } from "@/data/skills";
import type { SkillIcon } from "@/data/skills";
import SpotlightCard from "../shared/SpotlightCard";
import { useTranslation } from "react-i18next";
import { useActiveLang } from "@/hooks/useActiveLang";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<SkillIcon, LucideIcon> = {
  FileCode2, Braces, Atom, LayoutDashboard, Triangle,
  Server, Code2, Database, Github, Paintbrush, MousePointer2, Figma,
};

const categoryData = [
  { id: "todos",       label: "skills.categories.all" },
  { id: "frontend",   label: "skills.categories.frontend" },
  { id: "backend",    label: "skills.categories.backend" },
  { id: "herramientas", label: "skills.categories.tools" },
];

export const SkillsSection = () => {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategoryName = categoryData[activeCategory].id;
  const filteredSkills = skills.filter(
    (skill) => currentCategoryName === "todos" || skill.category === currentCategoryName
  );

  return (
    <section id="skills" className="relative py-28 px-4">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-family-title">
            Skills
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-3 mb-10" />
          </h2>

          <div className="flex justify-center mb-8 flex-wrap gap-2">
            {categoryData.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 cursor-pointer capitalize ${
                  activeCategory === index
                    ? "text-primary-foreground shadow-lg bg-gradient-to-r from-primary to-secondary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-primary/10"
                }`}
              >
                {t(category.label)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon];
              return (
                <SpotlightCard key={index} spotlightColor="rgba(102, 36, 168, 0.2)">
                  <div className="flex items-center justify-between p-4">
                    <h3 className="font-semibold text-left">{skill.name}</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2.5 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors duration-200 cursor-default shrink-0">
                          <Icon size={36} className="text-primary" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left">{skill[lang]}</TooltipContent>
                    </Tooltip>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
