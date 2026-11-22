import { HERO_POSTER, HERO_VIDEO } from "@/lib/media";

/** Full-bleed looping video; only the very top fades into the page. */
export function HeroMedia() {
  return (
    <div className="hero-media absolute inset-0 z-2 [mask-image:linear-gradient(to_bottom,transparent_0,#000_12%)]">
      <video
        id="heroVideo"
        className="size-full object-cover object-[center_60%] max-tablet:object-[30%_100%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        src={HERO_VIDEO}
      />
      {/* Dark scrim behind the bottom-right copy so the light text stays legible. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_88%_88%,color-mix(in_srgb,var(--color-scrim)_62%,transparent),color-mix(in_srgb,var(--color-scrim)_25%,transparent)_55%,transparent_100%)] max-tablet:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-scrim)_70%,transparent),color-mix(in_srgb,var(--color-scrim)_30%,transparent)_45%,transparent_70%)]"
        aria-hidden
      />
    </div>
  );
}
