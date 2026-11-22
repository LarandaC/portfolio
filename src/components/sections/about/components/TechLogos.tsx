import { TECH_LOGOS } from "../const/constants";

/** Stack row of the main technologies. */
export function TechLogos() {
  return (
    <div className="relative flex w-[min(860px,100%)] justify-center">
      <div className="relative z-6 flex w-[min(860px,100%)] items-center justify-between gap-6 px-2.5 py-1.5 text-coal max-laptop:flex-wrap max-laptop:justify-center max-laptop:gap-x-[26px] max-laptop:gap-y-3.5 @max-xl:flex-wrap @max-xl:justify-center @max-xl:gap-x-[22px] @max-xl:gap-y-3">
        {TECH_LOGOS.map(({ name, icon: Icon }) => (
          <span
            key={name}
            className="inline-flex items-center gap-[7px] text-[19px] font-bold tracking-[-.03em] whitespace-nowrap max-laptop:text-base @max-xl:text-base"
          >
            <Icon size={19} aria-hidden />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
