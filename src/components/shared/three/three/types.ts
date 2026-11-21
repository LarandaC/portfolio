/** Theme colors handed to every 3D scene, already resolved to CSS rgb() strings. */
export type SceneColors = {
  petal: string;
  blossom: string;
  lavender: string;
  mist: string;
};

/** Props every lazily loaded scene receives from PetalLayer. */
export type SceneProps = {
  count: number;
  colors: SceneColors;
  /** Pauses rendering while the section is off-screen. */
  active: boolean;
};
