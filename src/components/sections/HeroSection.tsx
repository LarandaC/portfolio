import { ArrowDown } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <RevealOnScroll>
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in">Hola, soy </span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1">
                {""}Leticia{" "}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-2-2xl opacity-0 animate-fade-in-delay-3">
              Desarrolladora Frontend con pasión por crear soluciones
              innovadoras y mejorar la experiencia del usuario. Diseño
              aplicaciones web atractivas y funcionales, enfocadas en usabilidad
              y rendimiento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#projects" className="cosmic-button">
                Mis proyectos
              </a>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-column items-center animate-bounce">
        <a href="#about" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
          <ArrowDown className="h-5 w-5 text-primary" />
        </a>
      </div>
    </section>
  );
};
