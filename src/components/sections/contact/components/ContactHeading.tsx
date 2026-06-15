import { useTranslation } from "react-i18next";

export function ContactHeading() {
  const { t } = useTranslation();

  return (
    <>
      <p className="font-mono text-xs tracking-[0.32em] uppercase mb-14 contact-label">
        04 · {t("contact.title")}
      </p>
      <h2 className="font-family-display font-bold leading-none contact-heading-solid">
        TRABAJEMOS
      </h2>
      <h2 className="font-family-display font-bold leading-none contact-heading-outline">
        JUNTOS
      </h2>
    </>
  );
}
