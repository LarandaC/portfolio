import { gsap } from "gsap";

/** Service tickets rise in as the section scrolls into view. */
export function setupAboutScroll(mm: gsap.MatchMedia) {
  mm.add("(min-width: 901px) and (min-height: 700px)", () => {
    gsap.from(".service-card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: ".services", start: "top 75%" },
    });
  });

  mm.add("(max-width: 900px), (max-height: 699px)", () => {
    gsap.from(".service-card", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: ".services", start: "top 85%" },
    });
  });
}
