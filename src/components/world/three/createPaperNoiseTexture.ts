import { DataTexture, LinearFilter, RepeatWrapping, RGBAFormat } from "three";

const SIZE = 256;

/** Lattice hash wrapped to `period` so it tiles. */
function hash(x: number, y: number, period: number, seed: number) {
  x = ((x % period) + period) % period;
  y = ((y % period) + period) % period;
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function tileableFbm(x: number, y: number, period: number, seed: number) {
  let value = 0;
  let amplitude = 0.5;
  for (let o = 0; o < 3; o++) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(ix, iy, period, seed + o);
    const b = hash(ix + 1, iy, period, seed + o);
    const c = hash(ix, iy + 1, period, seed + o);
    const d = hash(ix + 1, iy + 1, period, seed + o);
    value += amplitude * (a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy);
    x *= 2;
    y *= 2;
    period *= 2;
    amplitude *= 0.5;
  }
  return value;
}

/** Watercolor noise: R, G wobble · B fine grain · A coarse grain. */
export function createPaperNoiseTexture() {
  const data = new Uint8Array(SIZE * SIZE * 4);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4;
      const u = x / SIZE;
      const v = y / SIZE;
      data[i] = tileableFbm(u * 16, v * 16, 16, 1) * 255;
      data[i + 1] = tileableFbm(u * 16, v * 16, 16, 7) * 255;
      data[i + 2] = tileableFbm(u * 64, v * 64, 64, 13) * 255;
      data[i + 3] = tileableFbm(u * 16, v * 16, 16, 19) * 255;
    }
  }
  const texture = new DataTexture(data, SIZE, SIZE, RGBAFormat);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
