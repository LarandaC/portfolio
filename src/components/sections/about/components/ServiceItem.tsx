import type { LucideIcon } from "lucide-react";

interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  index: number;
}

/** Lime "ticket" card for one service. */
export function ServiceItem({ icon: Icon, title, desc, index }: ServiceItemProps) {
  return (
    <article className="service-card ticket flex min-h-[168px] flex-col justify-between gap-3 px-6 pt-[18px] pb-5 text-deep-ink max-laptop:min-h-[150px]">
      <header className="flex items-center justify-between">
        <Icon size={18} />
        <small className="text-[10.5px] font-semibold text-soft-ink tabular-nums">0{index + 1}</small>
      </header>
      <div>
        <h3 className="text-[clamp(19px,1.8vw,23px)] font-semibold tracking-[-.03em]">{title}</h3>
        <p className="text-[12.5px] leading-[1.4] text-soft-ink">{desc}</p>
      </div>
    </article>
  );
}
