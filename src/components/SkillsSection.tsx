import { useState } from "react";
import { cn } from "../lib/utils";

// lista de habilidades
const skills = [
  //frontend skills
  { name: "HTML/CSS", level: 95, category: "frontend", icon: "js-icon" },
  { name: "JavaScript", level: 90, category: "frontend", icon: "js-icon" },
  { name: "React", level: 90, category: "frontend", icon: "react-icon" },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "frontend",
    icon: "tailwind-icon",
  },
  //{ name: "Next.js", level: 80, category: "frontend", icon: "next-icon" },
  { name: "TypeScript", level: 80, category: "frontend", icon: "next-icon" },

  //backend skills
  //{ name: "Node.js", level: 80, category: "backend", icon: "node-icon" },
  { name: "Python", level: 80, category: "backend", icon: "python-icon" },
  //{ name: "Express", level: 75, category: "backend", icon: "express-icon" },
  { name: "PostgreSQL", level: 70, category: "backend", icon: "postgres-icon" },
  {
    name: "SQL Server",
    level: 70,
    category: "backend",
    icon: "sqlserver-icon",
  },

  //tools
  { name: "Git/GitHub", level: 90, category: "herramientas", icon: "git-icon" },
  { name: "Figma", level: 80, category: "herramientas", icon: "figma-icon" },
  { name: "VS Code", level: 80, category: "herramientas", icon: "vscode-icon" },
  //{ name: "Docker", level: 60, category: "tools", icon: "docker-icon" },
];

// categorias de las habilidades
const categories = ["todos", "frontend", "backend", "herramientas"];

// para listar las habilidades, mostrar el procentaje y filtrar por categorias
export const SkillsSection = () => {
  // estado para la categoria
  const [activeCategory, setActiveCategory] = useState("todos");

  // filtra la categoria segun el valor del estado, si es todos trae todo y si no solo trae lo que esta en activeCategoria
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "todos" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Skills
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize font-semibold",
                activeCategory === category
                  ? "bg-primary-gradient text-secondary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* aca se aplica el filtro para que solo aparezca lo seleccionado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary-gradient h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
