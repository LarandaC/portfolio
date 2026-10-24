import { gsap } from "gsap";

/** The logo pops in with a little spin, then a ring draws around it. */
export function setupFooterLogo() {
  gsap
    .timeline({ scrollTrigger: { trigger: "#footer", start: "top 95%" } })
    .from("#fLogo", { scale: 0.4, rotate: -25, opacity: 0, duration: 0.7, ease: "back.out(2.5)" })
    .to("#fRing", { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, "-=.35");
}
