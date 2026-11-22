/** Credits dialog (required by CC BY). Keep in step with assets-src/CREDITS.md. */
export type Credit = {
  /** credits.roles.* */
  roleKey: string;
  title: string;
  author: string;
  url: string;
  license: string;
  licenseUrl: string;
};

const CC_BY_4 = { license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" };

export const credits: Credit[] = [
  { roleKey: "amaru", title: "Somali Cat Animated ver 1.2", author: "DreamNoms", url: "https://skfb.ly/6ZsPo", ...CC_BY_4 },
  { roleKey: "inicio", title: "Japanese Shrine", author: "Wolvemancer", url: "https://skfb.ly/6UNDD", ...CC_BY_4 },
  { roleKey: "about", title: "Simple Japanese House 2", author: "JanaB", url: "https://skfb.ly/oyDtV", ...CC_BY_4 },
  // Poly Pizza gives no CC BY version.
  { roleKey: "projects", title: "Pagoda", author: "Poly by Google", url: "https://poly.pizza/m/d1M5ncMBUDi", license: "CC BY", licenseUrl: "https://poly.pizza/m/d1M5ncMBUDi" },
  { roleKey: "skills", title: "Japanese House", author: "IG_Shero", url: "https://skfb.ly/pHnOC", ...CC_BY_4 },
  { roleKey: "experience", title: "Japanese House", author: "Daniel Stringer", url: "https://skfb.ly/ooHFU", ...CC_BY_4 },
  { roleKey: "bell", title: "Japanese Bell Tower", author: "AO-INTERACTIVE", url: "https://skfb.ly/6GJE7", ...CC_BY_4 },
  { roleKey: "maple", title: "Japanese Maple Tree", author: "OliverMatheGames", url: "https://skfb.ly/6Swwv", ...CC_BY_4 },
  { roleKey: "lantern", title: "Japanese Stone Lantern", author: "Sahir Virmani", url: "https://skfb.ly/6QTTv", ...CC_BY_4 },
];
