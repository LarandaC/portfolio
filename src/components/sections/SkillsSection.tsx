import { useState } from "react";
import { cn } from "../../lib/utils";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import { skills } from "@/lib/skills";
import { motion, AnimatePresence } from "framer-motion";
import { icons, type LucideProps } from "lucide-react";

const categories = ["todos", "frontend", "backend", "herramientas"];

// obtener el componente de icono dinámicamente
const DynamicIcon = ({
  name,
  ...props
}: { name: keyof typeof icons } & LucideProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  // Retorna el componente de Lucide
  return <IconComponent {...props} />;
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "todos" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <RevealOnScroll>
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Skills
          </h2>

          {/* tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-1 px-4 py-2 sm:px-2 border border-border/70 rounded-full shadow-none sm:shadow-md  bg-card">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "relative py-1 px-1 sm:px-5 sm:py-2 transition-colors duration-300 font-semibold cursor-pointer outline-none z-10 rounded-full",
                      isActive
                        ? "text-primary-foreground"
                        : "text-foreground hover:text-primary"
                    )}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {/* motion si es activo */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBackground"
                        className="absolute inset-0 bg-primary-gradient rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="capitalize relative z-20 whitespace-nowrap">
                      {category}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* animacion */}
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-card p-6 rounded-lg shadow-md card-hover border border-border/70"
                >
                  <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                    {/* skill */}
                    <div className="text-left">
                      <h3 className="font-semibold text-lg">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}
                      </span>
                    </div>

                    {/* icon */}
                    <div className="text-right">
                      <motion.div
                        initial={{ opacity: 0, rotate: -45 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 150,
                        }}
                      >
                        <DynamicIcon
                          name={skill.icon}
                          className="w-8 h-8 text-muted-foreground"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
