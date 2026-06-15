import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";

interface SideNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  distance: number;
}

export function SideNavItem({ href, icon: Icon, label, isActive, distance }: SideNavItemProps) {
  return (
    <a
      href={href}
      className={`side-nav-item${isActive ? " active" : ""}`}
      style={{ "--distance": distance } as CSSProperties}
      aria-label={label}
      title={label}
    >
      <Icon size={16} />
    </a>
  );
}
