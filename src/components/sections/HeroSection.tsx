import { Face } from "@mui/icons-material";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";
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
      <RevealOnScroll>
        {/* Chip */}
        <div className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-1 mb-4 rounded-full text-base">
          <Face className="w-5 h-5" />
          <span>{t("hero.chip")}</span>
        </div>
        <div className="max-w-3xl mx-auto text-center z-10 flex flex-col gap-4">
          {/* Título principal */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-snug flex flex-wrap justify-center font-family-title">
            <span className="block mr-3">{t("hero.title")}</span>
            <GradientText showBorder={false}>{t("hero.subtitle")}</GradientText>
          </h1>

          {/* Descripción */}
          <p className="text-lg md:text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Botón de acción */}
          <Button text={t("hero.button")} href="#projects" />

          <TextType
            text={["Clean Code", "UI/UX Design", "Fast Delivery"]}
            typingSpeed={105}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
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
