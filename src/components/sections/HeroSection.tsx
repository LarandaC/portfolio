import { useEffect, useRef } from "react";
import { ArrowDown, Smile } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";
import TextType from "@/components/shared/TextType";
import GradientText from "@/components/shared/GradientText";
import { TechOrb } from "@/components/shared/TechOrb";
// import { CatWalker } from "@/components/shared/CatWalker";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

export const HeroSection = () => {
  const { t } = useTranslation();
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Glows de fondo — contenidos en su propio overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-glow w-96 h-96 bg-primary/20 -top-20 -left-20" />
        <div className="hero-glow w-80 h-80 bg-secondary-foreground/15 bottom-10 right-0" />
      </div>

      <div ref={parallaxRef} className="w-full">
      <RevealOnScroll>
        <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Columna de texto */}
          <div className="flex-1 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 border border-primary/60 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
              <Smile className="w-5 h-5" />
              <span>{t("hero.chip")}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight flex flex-wrap justify-center lg:justify-start gap-x-3 font-family-title">
              <span>{t("hero.title")}</span>
              <GradientText showBorder={false}>{t("hero.subtitle")}</GradientText>
            </h1>

            <p className="text-base md:text-lg text-foreground max-w-xl leading-relaxed">
              {t("hero.description")}
            </p>

            <Button asChild variant="gradient" size="pill" className="self-center lg:self-start mt-2">
              <a href="#projects">{t("hero.button")}</a>
            </Button>

            <TextType
              text={["Clean Code", "UI/UX Design", "Fast Delivery"]}
              typingSpeed={105}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              className="text-foreground"
            />
          </div>

          {/* Columna 3D — solo desktop */}
          <div className="hidden lg:flex flex-shrink-0 items-center justify-center">
            <TechOrb />
          </div>

        </div>
      </RevealOnScroll>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-10"
      >
        <div className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors">
          <ArrowDown className="w-6 h-6" />
        </div>
      </a>

      {/* Gato caminando */}
      {/* <CatWalker /> */}
    </section>
  );
};

export default HeroSection;
