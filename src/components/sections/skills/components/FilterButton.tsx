import type { LucideIcon } from "lucide-react";

interface FilterButtonProps {
  icon:     LucideIcon;
  label:    string;
  count:    number;
  isActive: boolean;
  onClick:  () => void;
}

export function FilterButton({ icon: Icon, label, count, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={`inline-flex h-[34px] items-center gap-2 rounded-full px-3.5 text-xs font-medium capitalize transition-colors duration-300 ${
        isActive ? "bg-brand text-on-brand shadow-btn" : "bg-pill text-pill-ink hover:bg-pill-hover"
      }`}
    >
      <Icon size={13} />
      {label}
      <span
        className={`rounded-full px-[7px] py-px text-[10.5px] font-semibold ${
          isActive ? "bg-white/18" : "bg-surface/65"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
