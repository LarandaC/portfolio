import { useTranslation } from "react-i18next";
import type { ExperienceEntry } from "@/data/experience";
import { TYPE_ICONS, TYPE_KEYS } from "../const/constants";

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

  return (
    <li className={`timeline-item relative max-tablet:mt-0 max-tablet:pr-0 max-tablet:pl-9 ${SIDE[side].item}`}>
      {/* `is-reached` is toggled by the scroll animation when the line gets here. */}
      <span
        className={`timeline-dot absolute top-[26px] z-1 size-4 rounded-full border-2 border-dot-border bg-surface shadow-[0_0_0_5px_var(--color-surface)] transition-[background-color,border-color] duration-400 max-tablet:right-auto max-tablet:left-0 [&.is-reached]:border-brand [&.is-reached]:bg-brand-soft ${SIDE[side].dot}`}
        aria-hidden
      />
      {/* No transform transition: GSAP slides the card in. */}
      <article className="timeline-card rounded-[22px] border border-line bg-surface/88 px-6 pt-[22px] pb-6 backdrop-blur-[6px] transition-[border-color,box-shadow] duration-300 hover:border-pill-hover hover:shadow-lift-lg">
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <span className="pill">
            <Icon size={11} />
            {t(TYPE_KEYS[entry.type])}
          </span>
          <span className="text-xs font-medium text-sage tabular-nums">{entry.period}</span>
        </div>
        <h3 className="mb-1 text-[clamp(19px,1.6vw,23px)] font-medium tracking-[-.03em]">{role}</h3>
        <p className="mb-2.5 text-[13px] font-semibold text-brand">{entry.organization}</p>
        <p className="text-sm leading-normal text-body">{description}</p>
      </article>
    </li>
  );
}
