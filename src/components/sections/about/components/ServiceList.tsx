import { useMemo } from "react";
import { Code, PaintBucket, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ServiceItem } from "./ServiceItem";

export function ServiceList() {
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
    [t],
  );

  return (
    <div className="flex flex-col">
      {services.map((service, index) => (
        <ServiceItem key={index} {...service} index={index} />
      ))}
    </div>
  );
}
