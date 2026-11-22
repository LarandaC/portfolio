import { DataTexture, NearestFilter, RedFormat } from "three";

/** Three hard light bands (shadow, mid, lit): the flat anime shading planned for the world. */
export function createToonGradient() {
  const texture = new DataTexture(new Uint8Array([90, 170, 255]), 3, 1, RedFormat);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}
