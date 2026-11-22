import { useTranslation } from "react-i18next";
import { cvUrl } from "@/lib/cv";
import { Button } from "@/components/common/Button";

export function AboutBio() {
  const { t } = useTranslation();

  return (
    <>
      <p className="reveal max-w-[660px] text-center text-[15px] leading-[1.55] text-body">
        {t("about.description")}
      </p>
      <div className="reveal mb-1.5 flex flex-wrap justify-center gap-2.5">
        <Button href="#contact">{t("about.buttonPrimary")}</Button>
        <Button variant="ghost" href={cvUrl} external>
          {t("about.buttonSecondary")}
        </Button>
      </div>
    </>
  );
}
