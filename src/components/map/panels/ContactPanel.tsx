import { useTranslation } from "react-i18next";
import { ContactLinks } from "@/components/sections/contact/components/ContactLinks";

/** "Contacto" on the dock: the invitation and the same contact links as the classic page. */
export function ContactPanel() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <h3 className="text-2xl font-medium tracking-[-.03em] text-ink">{t("contact.title")}</h3>
      <p className="max-w-[440px] text-sm leading-normal text-body">{t("contact.description")}</p>
      <ContactLinks />
    </div>
  );
}
