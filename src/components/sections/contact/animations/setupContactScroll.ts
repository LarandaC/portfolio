import { gsap } from "gsap";

/** Night valley parallax and the frosted card floating up into place. */
export function setupContactScroll() {
  gsap.fromTo(
    "#ctaImg",
    { yPercent: -12 },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: { trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: true },
    }
  );
  gsap.fromTo(
    "#ctaCard",
    { y: 80, scale: 0.94, opacity: 0, filter: "blur(10px)" },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      clearProps: "filter",
      scrollTrigger: { trigger: "#contact", start: "top 60%" },
    }
  );
}
