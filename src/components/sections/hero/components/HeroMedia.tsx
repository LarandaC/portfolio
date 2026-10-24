import { HERO_POSTER, HERO_VIDEO } from "@/lib/media";

/**
 * Looping cherry-blossom valley filling the whole hero, so the video's own sky
 * sits behind the clouds. Only the very top fades into the page.
 */
export function HeroMedia() {
  return (
    <div className="hero-media absolute inset-0 z-2 [mask-image:linear-gradient(to_bottom,transparent_0,#000_12%)]">
      <video
        id="heroVideo"
        className="size-full object-cover object-[center_70%] max-tablet:origin-bottom max-tablet:scale-[1.12] max-tablet:object-[38%_100%]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        src={HERO_VIDEO}
      />
      {/* Soft light veil behind the headline so the copy stays legible over the branches. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_48%_34%_at_50%_36%,color-mix(in_srgb,var(--color-surface)_82%,transparent),color-mix(in_srgb,var(--color-surface)_45%,transparent)_55%,transparent_100%)] max-tablet:bg-[radial-gradient(ellipse_90%_30%_at_50%_26%,color-mix(in_srgb,var(--color-surface)_85%,transparent),color-mix(in_srgb,var(--color-surface)_40%,transparent)_60%,transparent_100%)]"
        aria-hidden
      />
    </div>
  );
}
