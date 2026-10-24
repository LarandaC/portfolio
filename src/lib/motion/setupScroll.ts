import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupHeroScroll } from "@/components/sections/hero/animations/setupHeroScroll";
import { setupAboutScroll } from "@/components/sections/about/animations/setupAboutScroll";
import { setupProjectsScroll } from "@/components/sections/projects/animations/setupProjectsScroll";
import { setupExperienceScroll } from "@/components/sections/experience/animations/setupExperienceScroll";
import { setupContactScroll } from "@/components/sections/contact/animations/setupContactScroll";
import { setupFooterLogo } from "./setupFooterLogo";

/** All scroll-driven motion; runs once the intro has finished. Returns a cleanup. */
export function setupScroll() {
  setupHeroScroll();

  // Simple fade-up reveals
  gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  // Word-by-word heading reveals (the hero title is handled by the intro)
  gsap.utils.toArray<HTMLElement>("section:not(#hero) .split").forEach((el) => {
    gsap.fromTo(
      el.querySelectorAll(".w"),
      { opacity: 0, y: 22, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "filter",
        scrollTrigger: { trigger: el, start: "top 80%" },
      }
    );
  });

  const mm = gsap.matchMedia();
  setupAboutScroll(mm);
  setupProjectsScroll(mm);
  setupExperienceScroll(mm);
  setupContactScroll();
  setupFooterLogo();

  const refresh = () => ScrollTrigger.refresh();
  refresh();
  window.addEventListener("load", refresh);

  return () => {
    window.removeEventListener("load", refresh);
    mm.revert();
  };
}
