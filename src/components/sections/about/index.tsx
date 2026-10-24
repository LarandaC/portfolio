import { useTranslation } from "react-i18next";
import { TREE } from "@/lib/media";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SquareField } from "@/components/shared/SquareField";
import { AboutBio } from "./components/AboutBio";
import { ServiceList } from "./components/ServiceList";
import { TechLogos } from "./components/TechLogos";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative h-screen min-h-[760px] overflow-hidden bg-surface unpinned:h-auto unpinned:min-h-screen unpinned:pt-[90px] unpinned:pb-[300px]"
    >
      <SquareField count={22} />

      <div
        className="absolute inset-x-0 -bottom-[2%] z-2 mx-auto w-[min(340px,58vw)] unpinned:bottom-0"
        aria-hidden
      >
        <img id="tree" className="w-full" src={TREE} alt="" />
      </div>

      <div className="relative z-3 flex h-full flex-col items-center justify-center gap-5 px-4 pt-[70px]">
        <SectionHeader label={`01 · ${t("about.title")}`} title={[t("about.subtitle")]} />
        <AboutBio />
        <ServiceList />
        <TechLogos />
      </div>
    </section>
  );
}

export default AboutSection;
