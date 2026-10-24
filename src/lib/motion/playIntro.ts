import { gsap } from "gsap";

/** Page zooms out of the blurred landscape backdrop, then the hero assembles. */
export function playIntro(onComplete: () => void) {
  const heroWords = "#heroTitle .w";

  gsap.set(heroWords, { opacity: 0, y: 24, filter: "blur(10px)" });
  gsap.set(".hero-fade", { opacity: 0, y: 16 });
  gsap.set(".nav", { opacity: 0, y: -16 });

  return gsap
    .timeline({ delay: 0.25, onComplete })
    .fromTo("#app", { scale: 0.9, borderRadius: 28 }, { scale: 1, borderRadius: 0, duration: 1.4, ease: "expo.inOut" })
    .to(".nav", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=.5")
    .to(
      heroWords,
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, stagger: 0.07, ease: "power3.out", clearProps: "filter" },
      "-=.7"
    )
    .to(".hero-fade", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "<+.3")
    .from(".cloud-l", { x: -120, opacity: 0, duration: 1.6, ease: "power3.out" }, 0.4)
    .from(".cloud-r", { x: 120, opacity: 0, duration: 1.6, ease: "power3.out" }, 0.4)
    .from(
      "#heroGlass .glass",
      { opacity: 0, scale: 0.6, duration: 0.6, stagger: { each: 0.05, from: "random" }, ease: "back.out(2)" },
      "-=1"
    );
}
