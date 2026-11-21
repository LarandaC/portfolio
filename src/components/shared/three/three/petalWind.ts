/**
 * Scroll "wind" shared by every petal scene. GSAP writes `push` (see setupPetalWind),
 * each scene reads it in useFrame. A plain object so updates never re-render React.
 */
export const petalWind = { push: 0 };
