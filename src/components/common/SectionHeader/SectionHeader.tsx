import { Fragment, type ReactNode } from "react";
import { SplitWords } from "@/components/common/SplitWords";
import { Pill } from "@/components/common/Pill";

interface SectionHeaderProps {
  label: string;
  /** Each entry is rendered on its own line. */
  title: string[];
  className?: string;
  /** Extra classes for the h2, e.g. a smaller size inside a card. */
  titleClassName?: string;
  /** Optional content under the title (e.g. an intro paragraph). */
  children?: ReactNode;
}

/** Pill label + word-split h2 — the heading pattern shared by every section. */
export function SectionHeader({
  label,
  title,
  className = "",
  titleClassName = "",
  children,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <Pill className="reveal">{label}</Pill>
      <h2
        className={`split text-center text-[clamp(26px,3.1vw,44px)] leading-[1.12] font-normal tracking-[-.03em] ${titleClassName}`}
      >
        {title.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            <SplitWords text={line} />
          </Fragment>
        ))}
      </h2>
      {children}
    </div>
  );
}
