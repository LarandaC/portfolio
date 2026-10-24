import { useEffect, useState } from "react";

export const useScrollSpy = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    const observed = new Set<Element>();
    const observePresent = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
    };
    observePresent();

    // Some sections are lazy-loaded, so pick them up once they mount.
    const mutations = new MutationObserver(observePresent);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
};
