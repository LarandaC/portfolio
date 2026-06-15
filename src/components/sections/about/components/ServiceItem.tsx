import type { LucideIcon } from "lucide-react";

interface ServiceItemProps {
  icon:  LucideIcon;
  title: string;
  desc:  string;
  index: number;
}

export function ServiceItem({ icon: Icon, title, desc, index }: ServiceItemProps) {
  return (
    <div className="about-service-item">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-3">
          <Icon size={16} className="shrink-0 about-service-icon" />
          <h4 className="font-family-display font-bold text-base about-service-title">
            {title}
          </h4>
        </div>
        <span className="font-mono text-xs shrink-0 about-service-index">
          0{index + 1}
        </span>
      </div>
      <p className="text-sm leading-relaxed about-service-desc">
        {desc}
      </p>
    </div>
  );
}
