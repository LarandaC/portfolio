import { Code, PaintBucket, Rocket } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import { Button } from "../ui/Button";
import { SecondaryButton } from "../ui/SecondaryButton";
import SpotlightCard from "../shared/SpotlightCard";

export const AboutSection = () => {
  const services = [
    {
      icon: <Code />,
      title: "Desarrollo web",
      desc: "Experiencia en frontend y backend, desde React hasta Node.js y bases de datos.",
    },
    {
      icon: <PaintBucket />,
      title: "Diseño UI/UX",
      desc: "Diseño interfaces intuitivas, enfocadas en la usabilidad y el atractivo visual.",
    },
    {
      icon: <Rocket />,
      title: "Optimización",
      desc: "Mejora del rendimiento y escalabilidad de aplicaciones en producción..",
    },
  ];

  return (
    <section id="about" className="py-28 px-4 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            Sobre Mi
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-semibold">
                Passionate Web Developer
              </h3>
              <p className="text-muted-foreground text-lg">
                Soy una desarrolladora apasionada por crear soluciones
                tecnológicas innovadoras. Me especializo en construir
                aplicaciones escalables y eficientes. Mi enfoque combina la
                excelencia técnica con un fuerte sentido del diseño, asegurando
                que cada proyecto no solo funcione correctamente, sino que
                también ofrezca una experiencia de usuario excepcional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
                <Button href="#contact" text="Ponte en contacto" />
                <SecondaryButton
                  href="/files/CV-LeticiaAranda-2025.pdf"
                  text="Descarga CV"
                />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="flex flex-col gap-6">
              {services.map((service, index) => (
                <SpotlightCard
                  key={index}
                  spotlightColor="rgba(102, 36, 168, 0.2)"
                >
                  <div className="flex gap-4 p-6 text-left">
                    <div className="p-4 rounded-full flex items-center justify-center bg-primary/10">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{service.title}</h4>
                      <p className="text-foreground/70">{service.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
