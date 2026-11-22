interface DriftCloudProps {
  src: string;
  /** Position and size of the wrapper. */
  className: string;
  drift?: "a" | "b";
  /** Scroll-parallax strength, read by the hero's scroll animation. */
  parallax?: number;
}

const DRIFT = { a: "animate-drift-a", b: "animate-drift-b" };

/** Decorative watercolor cloud that slowly drifts back and forth. */
export function DriftCloud({ src, className, drift = "a", parallax }: DriftCloudProps) {
  return (
    <div className={`pointer-events-none ${className}`} data-par={parallax} aria-hidden>
      <img className={`w-full motion-reduce:animate-none ${DRIFT[drift]}`} src={src} alt="" />
    </div>
  );
}
