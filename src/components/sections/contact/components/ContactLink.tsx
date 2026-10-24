import type { LucideIcon } from "lucide-react";

interface ContactLinkProps {
  href:    string;
  icon:    LucideIcon;
  label:   string;
  primary: boolean;
}

export function ContactLink({ href, icon: Icon, label, primary }: ContactLinkProps) {
  const isMailto = href.startsWith("mailto");

  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className={primary ? "btn" : "btn-ghost"}
    >
      <Icon size={14} />
      {label}
    </a>
  );
}
