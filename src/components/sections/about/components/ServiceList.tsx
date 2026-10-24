import { useTranslation } from "react-i18next";
import { SERVICES } from "../const/constants";
import { ServiceItem } from "./ServiceItem";

export function ServiceList() {
  const { t } = useTranslation();

  return (
    <>
      <div className="services relative z-4 grid w-[min(880px,100%)] grid-cols-3 gap-3 max-laptop:w-[min(480px,100%)] max-laptop:grid-cols-1">
        {SERVICES.map(({ icon, key }, index) => (
          <ServiceItem
            key={key}
            icon={icon}
            title={t(`${key}.title`)}
            desc={t(`${key}.description`)}
            index={index}
          />
        ))}
      </div>
      <div
        className="relative z-3 -mt-4 h-2.5 w-[min(820px,94%)] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,.08),transparent)]"
        aria-hidden
      />
    </>
  );
}
