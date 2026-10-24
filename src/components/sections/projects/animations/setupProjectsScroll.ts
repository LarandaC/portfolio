import { gsap } from "gsap";

/** Desktop: panels rise in and the cloud drifts; mobile: stacked projects fade up. */
export function setupProjectsScroll(mm: gsap.MatchMedia) {
  mm.add("(min-width: 761px)", () => {
    gsap.from(".panel-in", {
      y: 120,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      scrollTrigger: { trigger: "#projects", start: "top 60%" },
    });
    gsap.to(".loop-cloud", {
      x: 60,
      ease: "none",
      scrollTrigger: { trigger: "#projects", start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  mm.add("(max-width: 760px)", () => {
    gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
      gsap.from(panel.querySelectorAll(".panel-in > *"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        scrollTrigger: { trigger: panel, start: "top 85%" },
      });
    });
  });
}
