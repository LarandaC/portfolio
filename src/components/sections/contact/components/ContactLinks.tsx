import { contactLinks } from "../const/constants";
import { ContactLink } from "./ContactLink";

export function ContactLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
      {contactLinks.map(({ href, icon, label }) => (
        <ContactLink key={label} href={href} icon={icon} label={label} />
      ))}
    </div>
  );
}
