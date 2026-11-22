import { useTranslation } from "react-i18next";
import { AboutBio } from "@/components/sections/about/components/AboutBio";
import { ServiceList } from "@/components/sections/about/components/ServiceList";
import { TechLogos } from "@/components/sections/about/components/TechLogos";

/** "Sobre mí" inside the house: the same bio, services and tech logos as the classic page. */
export function AboutPanel() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-5">
      <h3 className="text-center text-2xl font-medium tracking-[-.03em] text-ink">{t("about.subtitle")}</h3>
      <AboutBio />
      <ServiceList />
      <TechLogos />
    </div>
  );
}
