import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import i18n from "@/i18n/config";
import { createLenis } from "@/lib/motion/createLenis";
import { playIntro } from "@/lib/motion/playIntro";
import { setupScroll } from "@/lib/motion/setupScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis + intro zoom, then the scroll-driven animations. Scrolling only starts
 * once the intro has finished AND the lazily loaded sections are in the DOM,
 * since every ScrollTrigger needs its final layout. Returns whether the intro is done.
 */
export function usePageMotion(sectionsReady: boolean) {
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // The intro always starts at the top of the page.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const { lenis, destroy } = createLenis();
    lenisRef.current = lenis;
    lenis.stop();

    const ctx = gsap.context(() => {
      playIntro(() => {
        document.body.classList.remove("intro");
        gsap.set("#app", { clearProps: "all" }); // a transformed #app would break pinning
        setIntroDone(true);
      });
    });

    // Text length changes with the language, which shifts every trigger.
    const onLanguageChanged = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    i18n.on("languageChanged", onLanguageChanged);

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
      ctx.revert();
      destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!introDone || !sectionsReady) return;

    let teardownScroll: (() => void) | undefined;
    const ctx = gsap.context(() => {
      teardownScroll = setupScroll();
    });
    lenisRef.current?.start();

    return () => {
      teardownScroll?.();
      ctx.revert();
    };
  }, [introDone, sectionsReady]);

  return introDone;
}
