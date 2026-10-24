import { CLOUD_A } from "@/lib/media";
import { CLOUD_GLASS } from "../const/constants";

export function ProjectsCloud() {
  return (
    <div
      className="loop-cloud pointer-events-none absolute top-[4vh] -left-[4vw] z-3 w-[min(36vw,520px)] max-tablet:top-[2vh] max-tablet:-left-[14vw] max-tablet:w-[62vw] max-tablet:opacity-90"
      aria-hidden
    >
      <img className="w-full animate-drift-a motion-reduce:animate-none" src={CLOUD_A} alt="" />
      {CLOUD_GLASS.map(([left, top, width]) => (
        <span
          key={`${left}-${top}`}
          className="glass aspect-square"
          style={{ left: `${left}%`, top: `${top}%`, width: `${width}%` }}
        />
      ))}
    </div>
  );
}
