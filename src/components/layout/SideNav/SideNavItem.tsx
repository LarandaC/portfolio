import type { LucideIcon } from "lucide-react";

interface SideNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export function SideNavItem({ href, icon: Icon, label, isActive }: SideNavItemProps) {
  return (
    <a
      href={href}
      className={`side-nav-item${isActive ? " active" : ""}`}
      aria-label={label}
      title={label}
    >
      <Icon size={16} />
    </a>
  );
}
