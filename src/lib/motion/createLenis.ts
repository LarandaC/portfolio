import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Lenis smooth scroll driven by the GSAP ticker, plus smooth in-page anchors. */
export function createLenis() {
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  const onClick = (e: MouseEvent) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const id = link.getAttribute("href")!;
    if (id.length > 1) lenis.scrollTo(id, { duration: 1.6 });
  };
  document.addEventListener("click", onClick);

  const destroy = () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(raf);
    lenis.destroy();
  };

  return { lenis, destroy };
}
