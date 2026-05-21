import { ArrowDown, Smile } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";
import TextType from "@/components/shared/TextType";
import GradientText from "@/components/shared/GradientText";
import { useTranslation } from "react-i18next";

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Glows de fondo */}
      <div className="hero-glow w-96 h-96 bg-primary/20 -top-20 -left-20" />
      <div className="hero-glow w-80 h-80 bg-secondary-foreground/15 bottom-10 right-0" />

      <RevealOnScroll>
        {/* Chip */}
        <div className="inline-flex items-center gap-2 border border-primary/60 bg-primary/5 text-primary px-4 py-1.5 mb-6 rounded-full text-sm font-medium backdrop-blur-sm">
          <Smile className="w-5 h-5" />
          <span>{t("hero.chip")}</span>
        </div>
        <div className="max-w-3xl mx-auto text-center z-10 flex flex-col gap-4">
          {/* Título principal */}
          <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-tight flex flex-wrap justify-center gap-x-3 font-family-title">
            <span>{t("hero.title")}</span>
            <GradientText showBorder={false}>{t("hero.subtitle")}</GradientText>
          </h1>

          <p className="text-base md:text-lg text-foreground max-w-xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          <Button asChild variant="gradient" size="pill" className="self-center mt-2">
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
      </RevealOnScroll>

      {/* Indicador de scroll */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce"
      >
        <div className="bg-primary/10 text-primary p-3 rounded-full hover:bg-primary/20 transition-colors">
          <ArrowDown className="w-6 h-6" />
        </div>
      </a>
    </section>
  );
};

export default HeroSection;
