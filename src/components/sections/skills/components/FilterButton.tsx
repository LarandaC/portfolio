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
      className={`flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-widest uppercase cursor-pointer skills-filter-btn${isActive ? " active" : ""}`}
    >
      <Icon size={12} />
      {label}
      <span className="skills-filter-count">{count}</span>
    </button>
  );
}
