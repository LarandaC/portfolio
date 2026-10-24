import { TECH_LOGOS } from "../const/constants";

/** Stack row; the frosted band blurs the tree where it rises behind it. */
export function TechLogos() {
  return (
    <div className="relative flex w-[min(860px,100%)] justify-center">
      <div
        className="absolute inset-x-0 -top-1.5 z-5 mx-auto h-16 w-[min(340px,58vw)] bg-white/12 backdrop-blur-[14px] [mask-image:linear-gradient(90deg,transparent,#000_18%,#000_82%,transparent)] unpinned:hidden"
        aria-hidden
      />
      <div className="relative z-6 flex w-[min(860px,100%)] items-center justify-between gap-6 px-2.5 py-1.5 text-coal max-laptop:flex-wrap max-laptop:justify-center max-laptop:gap-x-[26px] max-laptop:gap-y-3.5">
        {TECH_LOGOS.map(({ name, icon: Icon }) => (
          <span
            key={name}
            className="inline-flex items-center gap-[7px] text-[19px] font-bold tracking-[-.03em] whitespace-nowrap max-laptop:text-base"
          >
            <Icon size={19} aria-hidden />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
