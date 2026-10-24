import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ContactLinks } from "./ContactLinks";

/** Frosted white-to-clear card floating over the night valley. */
export function ContactCard() {
  const { t } = useTranslation();

  return (
    <div
      id="ctaCard"
      className="absolute inset-x-0 top-[30%] z-4 mx-auto w-[min(700px,calc(100%-32px))] rounded-[26px] border border-surface/70 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-surface)_96%,transparent)_0%,color-mix(in_srgb,var(--color-surface)_75%,transparent)_35%,color-mix(in_srgb,var(--color-surface)_12%,transparent)_100%)] px-7 pt-[46px] pb-[54px] text-center shadow-[0_30px_60px_rgba(10,20,60,.18)] backdrop-blur-[16px] backdrop-saturate-[1.1] max-tablet:top-[110px] max-tablet:px-[18px] max-tablet:pt-[34px] max-tablet:pb-[42px]"
    >
      <SectionHeader
        className="mb-3"
        titleClassName="text-[clamp(24px,2.8vw,38px)]"
        label={`05 · ${t("nav.contact")}`}
        title={[t("contact.title")]}
      />
      <p className="reveal mx-auto mb-[22px] max-w-[520px] text-sm leading-normal text-night-ink">
        {t("contact.description")}
      </p>
      <ContactLinks />
    </div>
  );
}
