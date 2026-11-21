import { useTranslation } from "react-i18next";
import { experiences } from "@/data/experience";
import { TREE } from "@/lib/media";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SquareField } from "@/components/shared/SquareField";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { TYPE_ICONS } from "./const/constants";

const WORK = experiences.filter((e) => e.type === "work" || e.type === "freelance");
const EDUCATION = experiences.filter((e) => e.type === "education");

export function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section
      id="experience"
      className="relative overflow-clip bg-surface px-4 pt-[140px] pb-[360px] max-tablet:pt-[110px] max-tablet:pb-[280px]"
    >
      <SquareField count={22} />

      {/* Cherry tree that sticks to the bottom of the viewport while the section scrolls and rises
          with it, behind the cards. overflow-clip (not hidden) on the section keeps sticky working. */}
      <div className="pointer-events-none absolute inset-0 z-1 flex flex-col justify-end" aria-hidden>
        <div className="sticky bottom-0 mx-auto w-[min(340px,58vw)]">
          <img id="tree" className="w-full" src={TREE} alt="" />
        </div>
      </div>

      <div className="relative z-2 mx-auto max-w-[980px]">
        <SectionHeader
          label={`04 · ${t("experience.columnWork")} · ${t("experience.columnEducation")}`}
          title={[t("experience.title")]}
        />
        <ExperienceTimeline title={t("experience.columnWork")} icon={TYPE_ICONS.work} entries={WORK} />
        <ExperienceTimeline
          title={t("experience.columnEducation")}
          icon={TYPE_ICONS.education}
          entries={EDUCATION}
        />
      </div>
    </section>
  );
}

export default ExperienceSection;
