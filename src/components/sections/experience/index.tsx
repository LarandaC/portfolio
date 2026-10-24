import { useTranslation } from "react-i18next";
import { experiences } from "@/data/experience";
import { CLOUD_B } from "@/lib/media";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SquareField } from "@/components/shared/SquareField";
import { DriftCloud } from "@/components/shared/DriftCloud";
import { ExperienceTimeline } from "./components/ExperienceTimeline";

export function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface px-4 pt-[140px] pb-[130px] max-tablet:pt-[110px] max-tablet:pb-[90px]"
    >
      <SquareField count={16} />
      <DriftCloud
        src={CLOUD_B}
        className="absolute top-10 -left-[6vw] z-1 w-[min(32vw,440px)] max-tablet:-left-[18vw] max-tablet:w-[60vw]"
        drift="b"
      />

      <div className="relative z-2 mx-auto max-w-[980px]">
        <SectionHeader
          label={`04 · ${t("experience.columnWork")} · ${t("experience.columnEducation")}`}
          title={[t("experience.title")]}
        />
        <ExperienceTimeline entries={experiences} />
      </div>
    </section>
  );
}

export default ExperienceSection;
