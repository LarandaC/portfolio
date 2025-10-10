import { Briefcase, Code, User } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

// Seccion sobre mi
export const AboutSection = () => {
  return (
    <section id="about" className="p-24 px-4 relative">
      <RevealOnScroll>
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Sobre <span className="text-primary">Mi</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">
                Passionate Web Developer
              </h3>
              <p className="text-muted-foreground">
                Soy una desarrolladora junior, especializada en crear
                aplicaciones web responsivas, accesibles y de alto rendimiento
                utilizando tecnologías modernas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <a href="#contact" className="cosmic-button">
                  {" "}
                  Ponte en contacto
                </a>
                <a
                  href="/files/CV-LeticiaAranda-2025.pdf"
                  download
                  className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  {" "}
                  Descarga CV
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4 ">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Desarrollo web</h4>
                    <p className="text-muted-foreground">
                      Aplicaciones web dinámicas y responsivas usando frameworks
                      y librerías modernas
                    </p>
                  </div>
                </div>
              </div>
              <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4 ">
                  <div className="p-3 rounded-full bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Diseño UI/UX</h4>
                    <p className="text-muted-foreground">
                      Diseño interfaces intuitivas, enfocadas en la usabilidad y
                      el atractivo visual
                    </p>
                  </div>
                </div>
              </div>
              <div className="gradient-border p-6 card-hover">
                <div className="flex items-start gap-4 ">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">Copy y UI</h4>
                    <p className="text-muted-foreground">
                      Combinando texto, diseño y funcionalidad para destacar el
                      valor del producto en cada componente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
