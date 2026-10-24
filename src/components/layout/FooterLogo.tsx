import logo from "@/assets/icon/logo.webp";

/** Personal logo inside a ring that draws itself in (animated by setupFooterLogo). */
export function FooterLogo() {
  return (
    <div className="relative grid size-11 shrink-0 place-items-center text-logo-ring" aria-label="Leticia Aranda" role="img">
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <circle
          id="fRing"
          cx="22"
          cy="22"
          r="21"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="132"
          strokeDashoffset="132"
          transform="rotate(-90 22 22)"
        />
      </svg>
      <img id="fLogo" className="size-9 object-contain" src={logo} alt="" width={36} height={36} />
    </div>
  );
}
