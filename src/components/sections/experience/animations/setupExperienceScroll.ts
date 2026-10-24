import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** The line fills with scroll, each dot lights up as the line reaches it, cards slide in. */
export function setupExperienceScroll(mm: gsap.MatchMedia) {
  // The line's leading edge sits at 70% of the viewport...
  gsap.fromTo(
    ".timeline-progress",
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 70%", scrub: true },
    }
  );

  // ...so a dot is "reached" when it crosses that same line.
  gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((dot) => {
    // Stays lit once passed (toggleClass would unlight it when the dot leaves the top).
    ScrollTrigger.create({
      trigger: dot,
      start: "center 70%",
      onEnter: () => dot.classList.add("is-reached"),
      onLeaveBack: () => dot.classList.remove("is-reached"),
    });
    gsap.from(dot, {
      scale: 0,
      duration: 0.5,
      ease: "back.out(3)",
      scrollTrigger: { trigger: dot, start: "top 85%" },
    });
  });

  // Desktop cards slide in from their own side of the line; mobile cards rise.
  mm.add("(min-width: 761px)", () => {
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
      gsap.from(item.querySelector(".timeline-card"), {
        x: i % 2 === 0 ? -40 : 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 85%" },
      });
    });
  });

  mm.add("(max-width: 760px)", () => {
    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });
  });
}
