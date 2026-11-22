import { DataTexture, NearestFilter, RedFormat } from "three";

let shared: DataTexture | undefined;

/** Shared 3-band toon gradient; lives for the whole page, never disposed. */
export function getToonGradient() {
  if (!shared) {
    shared = new DataTexture(new Uint8Array([90, 170, 255]), 3, 1, RedFormat);
    shared.minFilter = NearestFilter;
    shared.magFilter = NearestFilter;
    shared.generateMipmaps = false;
    shared.needsUpdate = true;
  }
  return shared;
}
