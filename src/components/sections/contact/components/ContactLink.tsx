import type { LucideIcon } from "lucide-react";

interface ContactLinkProps {
  href:  string;
  icon:  LucideIcon;
  label: string;
}

export function ContactLink({ href, icon: Icon, label }: ContactLinkProps) {
  const isMailto = href.startsWith("mailto");

  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className="flex items-center gap-2.5 font-mono text-xs tracking-[0.18em] uppercase group contact-link"
    >
      <Icon size={13} />
      {label}
      <span className="block h-px w-0 group-hover:w-5 transition-all duration-300 contact-link-line" />
    </a>
  );
}
