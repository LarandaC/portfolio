import { contactLinks } from "../const/constants";
import { ContactLink } from "./ContactLink";

export function ContactLinks() {
  return (
    <div className="reveal flex flex-wrap justify-center gap-2.5">
      {contactLinks.map(({ href, icon, label, primary }) => (
        <ContactLink key={label} href={href} icon={icon} label={label} primary={primary} />
      ))}
    </div>
  );
}
