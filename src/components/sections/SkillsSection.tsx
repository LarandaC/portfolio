import { useState } from "react";
import {
  Atom, Braces, Code2, Database, FileCode2,
  Figma, Github, LayoutDashboard, MousePointer2,
  Paintbrush, Server, Triangle,
  Layers, Monitor, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { skills } from "@/data/skills";
import type { SkillIcon } from "@/data/skills";
import SpotlightCard from "../shared/SpotlightCard";
import { useTranslation } from "react-i18next";
import { useActiveLang } from "@/hooks/useActiveLang";

const iconMap: Record<SkillIcon, LucideIcon> = {
  FileCode2, Braces, Atom, LayoutDashboard, Triangle,
  Server, Code2, Database, Github, Paintbrush, MousePointer2, Figma,
};

const levelDots = (level: string) => {
  if (level === "Advanced") return 3;
  if (level === "Intermediate") return 2;
  return 1;
};

const categoryData = [
  { id: "todos",        label: "skills.categories.all",      icon: Layers },
  { id: "frontend",    label: "skills.categories.frontend",  icon: Monitor },
  { id: "backend",     label: "skills.categories.backend",   icon: Server },
  { id: "herramientas",label: "skills.categories.tools",     icon: Wrench },
];

const categoryCounts: Record<string, number> = {
  todos: skills.length,
  frontend: skills.filter((s) => s.category === "frontend").length,
  backend: skills.filter((s) => s.category === "backend").length,
  herramientas: skills.filter((s) => s.category === "herramientas").length,
};

export const SkillsSection = () => {
  const { t } = useTranslation();
  const lang = useActiveLang();
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategoryName = categoryData[activeCategory].id;
  const filteredSkills = skills.filter(
    (skill) => currentCategoryName === "todos" || skill.category === currentCategoryName
  );

  return (
    <section id="skills" className="relative py-16 px-4">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 font-family-title">
            Skills
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-3 mb-10" />
          </h2>

          <div className="flex justify-center mb-10 flex-wrap gap-2">
            {categoryData.map((category, index) => {
              const CategoryIcon = category.icon;
              const isActive = activeCategory === index;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(index)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer capitalize ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary-foreground text-primary-foreground "
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  <CategoryIcon size={14} />
                  {t(category.label)}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {categoryCounts[category.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon];
              const dots = levelDots(skill.en);
              return (
                <SpotlightCard key={index} spotlightColor="rgba(102, 36, 168, 0.2)">
                  <div className="flex flex-col items-center gap-3 p-5 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary-foreground/10 border border-primary/15 flex items-center justify-center text-primary shadow-[0_0_14px_hsl(var(--primary)/0.12)]">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {skill.name}
                    </h3>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-1.5">
                        {[1, 2, 3].map((dot) => (
                          <span
                            key={dot}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              dot <= dots ? "bg-primary" : "bg-muted-foreground/25"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {skill[lang]}
                      </span>
                    </div>
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
