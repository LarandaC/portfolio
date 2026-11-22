import { useTranslation } from "react-i18next";
import { educationExperiences, workExperiences } from "@/data/experience";
import { ExperienceTimeline } from "@/components/sections/experience/components/ExperienceTimeline";
import { TYPE_ICONS } from "@/components/sections/experience/const/constants";

/** "Experiencia" inside the house: work and education timelines, as on the classic page. */
export function ExperiencePanel() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <ExperienceTimeline title={t("experience.columnWork")} icon={TYPE_ICONS.work} entries={workExperiences} />
      <ExperienceTimeline title={t("experience.columnEducation")} icon={TYPE_ICONS.education} entries={educationExperiences} />
    </div>
  );
}
