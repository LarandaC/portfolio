import { useMemo } from "react";
import { Code, PaintBucket, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { useTranslation } from "react-i18next";

export const AboutSection = () => {
  const { t } = useTranslation();

  const services = useMemo(
    () => [
      {
        icon: Code as LucideIcon,
        title: t("aboutWebDevelopmentCard.title"),
        desc: t("aboutWebDevelopmentCard.description"),
      },
      {
        icon: PaintBucket as LucideIcon,
        title: t("aboutDesignCard.title"),
        desc: t("aboutDesignCard.description"),
      },
      {
        icon: Rocket as LucideIcon,
        title: t("aboutOptCard.title"),
        desc: t("aboutOptCard.description"),
      },
    ],
    [t]
  );

  return (
    <section id="about" className="py-30 px-4 relative">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-family-title">
            {t("about.title")}
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary-foreground mx-auto rounded-full mt-3" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h3 className="text-2xl text-primary font-semibold">
                {t("about.subtitle")}
              </h3>
              <p className="text-foreground text-lg">
                {t("about.description")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center items-center">
                <Button asChild variant="gradient" size="pill">
                  <a href="#contact">{t("about.buttonPrimary")}</a>
                </Button>
                <Button asChild variant="outline" size="pill">
                  <a
                    href="/files/CV-LeticiaAranda-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("about.buttonSecondary")}
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <SpotlightCard key={index} spotlightColor="rgba(102, 36, 168, 0.2)">
                    <div className="px-5 py-4 flex  gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary-foreground/10 border border-primary/15 flex items-center justify-center text-primary shadow-[0_0_14px_hsl(var(--primary)/0.12)]">
                          <Icon size={22} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-foreground text-left">{service.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed mt-0.5 text-left">{service.desc}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-mono text-primary/40 font-bold tracking-widest">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-primary/30 via-secondary-foreground/20 to-transparent" />
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
