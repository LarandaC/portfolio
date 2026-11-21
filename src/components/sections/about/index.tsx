import { useTranslation } from "react-i18next";
import { CLOUD_B } from "@/lib/media";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SquareField } from "@/components/shared/SquareField";
import { DriftCloud } from "@/components/shared/DriftCloud";
import { AboutBio } from "./components/AboutBio";
import { ServiceList } from "./components/ServiceList";
import { TechLogos } from "./components/TechLogos";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative h-screen min-h-[760px] overflow-hidden bg-surface unpinned:h-auto unpinned:min-h-screen unpinned:py-[90px]"
    >
      <SquareField count={16} />
      <DriftCloud
        src={CLOUD_B}
        className="absolute top-10 -left-[6vw] z-1 w-[min(32vw,440px)] max-tablet:-left-[18vw] max-tablet:w-[60vw]"
        drift="b"
      />

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
