import { Code, PaintBucket, Rocket } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Code />,
      title: t("aboutWebDevelopmentCard.title"),
      desc: t("aboutWebDevelopmentCard.description"),
    },
    {
      icon: <PaintBucket />,
      title: t("aboutDesignCard.title"),
      desc: t("aboutDesignCard.description"),
    },
    {
      icon: <Rocket />,
      title: t("aboutOptCard.title"),
      desc: t("aboutOptCard.description"),
    },
  ];

  return (
    <section id="about" className="py-28 px-4 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 font-family-title">
            {t("about.title")}
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-4" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-semibold">{t("about.subtitle")}</h3>
              <p className="text-muted-foreground text-lg">
                {t("about.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center">
                <Button href="#contact" text={t("about.buttonPrimary")} />
                <SecondaryButton
                  href="/files/CV-LeticiaAranda-2025.pdf"
                  text={t("about.buttonSecondary")}
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
