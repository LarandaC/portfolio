import { useState, useEffect, useRef } from "react";
import { skills } from "@/data/skills";
import { categoryData } from "../const/constants";

export function useSkillsFilter() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [animKey, setAnimKey]               = useState(0);
  const gridWrapperRef                      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridWrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimKey((k) => k + 1); },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setAnimKey((k) => k + 1);
  };

  const currentId      = categoryData[activeCategory].id;
  const filteredSkills = skills.filter(
    (s) => currentId === "todos" || s.category === currentId
  );

  return { activeCategory, animKey, filteredSkills, handleCategoryChange, gridWrapperRef };
}
