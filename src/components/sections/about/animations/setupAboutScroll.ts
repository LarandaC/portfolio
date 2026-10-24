import { gsap } from "gsap";

/** Large screens pin the section while the tree rises behind the tickets. */
export function setupAboutScroll(mm: gsap.MatchMedia) {
  // Must mirror the CSS query that switches .about to its unpinned layout.
  mm.add("(min-width: 901px) and (min-height: 700px)", () => {
    gsap.from(".service-card", {
      y: 40,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: ".services", start: "top 70%" },
    });

    gsap
      .timeline({
        scrollTrigger: { trigger: "#about", start: "top top", end: "+=120%", pin: true, scrub: 1 },
      })
      .fromTo("#tree", { yPercent: 75 }, { yPercent: 6, ease: "none" });
  });

  mm.add("(max-width: 900px), (max-height: 699px)", () => {
    gsap.from(".service-card", {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      scrollTrigger: { trigger: ".services", start: "top 85%" },
    });
    gsap.fromTo(
      "#tree",
      { yPercent: 40 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true },
      }
    );
  });
}
