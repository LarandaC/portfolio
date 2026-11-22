/** Resolved rgb() strings. */
export type SceneColors = {
  petal: string;
  blossom: string;
  lavender: string;
};

export type SceneProps = {
  count: number;
  colors: SceneColors;
  active: boolean;
};
