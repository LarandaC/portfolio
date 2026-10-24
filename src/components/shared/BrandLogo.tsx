import logo from "@/assets/icon/logo.webp";

/** Personal logo (kitten on a rocket) shown next to the name. */
export function BrandLogo() {
  return <img className="size-8 shrink-0 object-contain" src={logo} alt="" width={32} height={32} />;
}
