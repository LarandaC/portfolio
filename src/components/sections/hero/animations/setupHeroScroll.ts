import { gsap } from "gsap";
import { heroMotion } from "../three/heroMotion";

/** Headline, clouds and video drift at different speeds as the hero scrolls away. */
export function setupHeroScroll() {
  const scrub = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true };

  gsap.to(".hero-content", { yPercent: -60, ease: "none", scrollTrigger: scrub });
  gsap.utils.toArray<HTMLElement>(".hero [data-par]").forEach((el) => {
    gsap.to(el, { y: Number(el.dataset.par) * 2, ease: "none", scrollTrigger: scrub });
  });
  gsap.to(".hero-media", { yPercent: 8, ease: "none", scrollTrigger: scrub });
  // The 3D camera eases forward as the hero scrolls away.
  gsap.to(heroMotion, { progress: 1, ease: "none", scrollTrigger: scrub });
}
