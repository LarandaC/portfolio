import { useTranslation } from "react-i18next";
import type { ExperienceEntry } from "@/data/experience";
import { TYPE_ICONS, TYPE_KEYS } from "../const/constants";
import { Pill } from "@/components/common/Pill";
import { Card } from "@/components/common/Card";

interface ExperienceItemProps {
  entry: ExperienceEntry;
  /** Desktop zig-zag: left of the line, or right and shifted down. */
  side: "left" | "right";
}

const SIDE = {
  left: { item: "pr-12", dot: "-right-2" },
  right: { item: "mt-[140px] pl-12", dot: "-left-2" },
};

/** One entry on the timeline: a dot on the line plus its card. */
export function ExperienceItem({ entry, side }: ExperienceItemProps) {
  const { t } = useTranslation();
  const Icon = TYPE_ICONS[entry.type];
  const role = t(`experience.entries.${entry.id}.role`, { defaultValue: entry.role });
  const description = t(`experience.entries.${entry.id}.description`, {
    defaultValue: entry.description,
  });
  const highlights = entry.highlights
    ? (t(`experience.entries.${entry.id}.highlights`, { returnObjects: true, defaultValue: entry.highlights }) as string[])
    : [];

  return (
    <li data-side={side} className={`timeline-item relative max-tablet:mt-0 max-tablet:pr-0 max-tablet:pl-9 @max-xl:mt-0 @max-xl:pr-0 @max-xl:pl-9 ${SIDE[side].item}`}>
      {/* `is-reached` is toggled by the scroll animation when the line gets here. */}
      <span
        className={`timeline-dot absolute top-[26px] z-1 size-4 rounded-full border-2 border-dot-border bg-surface shadow-[0_0_0_5px_var(--color-surface)] transition-[background-color,border-color] duration-400 max-tablet:right-auto max-tablet:left-0 @max-xl:right-auto @max-xl:left-0 [&.is-reached]:border-brand [&.is-reached]:bg-brand-soft ${SIDE[side].dot}`}
        aria-hidden
      />
      {/* No transform transition: GSAP slides the card in. */}
      <Card as="article" variant="frosted" className="timeline-card px-6 pt-[22px] pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <Pill>
            <Icon size={11} />
            {t(TYPE_KEYS[entry.type])}
          </Pill>
          <span className="text-xs font-medium text-sage tabular-nums">{entry.period}</span>
        </div>
        <h3 className="mb-1 text-[clamp(19px,1.6vw,23px)] font-medium tracking-[-.03em]">{role}</h3>
        <p className="mb-2.5 text-[13px] font-semibold text-brand">{entry.organization}</p>
        <p className="text-sm leading-normal text-body">{description}</p>
        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1.5 text-sm leading-normal text-body">
            {highlights.map((item) => (
              <li key={item} className="relative pl-4 before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-brand">
                {item}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </li>
  );
}
