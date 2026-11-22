import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/common/Button";

interface ContactLinkProps {
  href:    string;
  icon:    LucideIcon;
  label:   string;
  primary: boolean;
}

export function ContactLink({ href, icon: Icon, label, primary }: ContactLinkProps) {
  const isMailto = href.startsWith("mailto");

  return (
    <Button href={href} external={!isMailto} variant={primary ? "primary" : "ghost"}>
      <Icon size={14} />
      {label}
    </Button>
  );
}
