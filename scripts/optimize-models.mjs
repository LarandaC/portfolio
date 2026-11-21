/**
 * Optimizes the original 3D downloads in assets-src/ into small files in public/models/.
 *
 *   npm run models            → only models whose source changed
 *   npm run models -- --force → all of them
 *
 * Meshopt geometry/animation compression + WebP textures at 1024 px max.
 * three.js needs the Meshopt decoder to load them (drei's useGLTF enables it).
 * Licenses and credits: assets-src/CREDITS.md.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "assets-src";
const OUT = "public/models";

/** Models published to the site. Anything not listed here stays local only. */
const MODELS = [
  // Amaru candidates
  { src: "cat/an_animated_cat.glb", out: "cat-evil-katz.glb" },
  { src: "cat/Cat by madtrollstudio - YvVobPlTlQ.glb", out: "cat-madtrollstudio.glb" },
  { src: "cat/low_poly_cat.glb", out: "cat-volkanongun.glb" },
  // Buildings
  { src: "house/Pagoda by Poly by Google - d1M5ncMBUDi.glb", out: "pagoda.glb" },
  { src: "house/japanese_house.glb", out: "house-daniel-stringer.glb" },
  { src: "house/japanese_house (1).glb", out: "house-ig-shero.glb" },
  { src: "house/simple_japanese_house_2.glb", out: "house-janab.glb" },
  // Left out on purpose:
  //   cat/cat_walk.glb                         CC-BY-NC: non-commercial license
  //   house/feudal_japanese_house.glb          ~373k triangles, too heavy for the web
  //   house/traditional_japanese_house.glb     ~814k triangles, too heavy for the web
];

const force = process.argv.includes("--force");
const mb = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`;
// Run the CLI's own script with Node: no shell, so paths with spaces stay intact on Windows too.
const cli = join("node_modules", "@gltf-transform", "cli", "bin", "cli.js");

mkdirSync(OUT, { recursive: true });

for (const { src, out } of MODELS) {
  const input = join(SRC, src);
  const output = join(OUT, out);

  if (!existsSync(input)) {
    console.warn(`!  falta ${input} (descárgalo de nuevo, ver assets-src/CREDITS.md)`);
    continue;
  }
  if (!force && existsSync(output) && statSync(output).mtimeMs > statSync(input).mtimeMs) {
    console.log(`=  ${out} ya está al día`);
    continue;
  }

  execFileSync(
    process.execPath,
    [
      cli,
      "optimize", input, output,
      "--compress", "meshopt",
      "--texture-compress", "webp",
      "--texture-size", "1024",
    ],
    { stdio: ["ignore", "ignore", "inherit"] } // errors still show
  );
  console.log(`✓  ${out}: ${mb(statSync(input).size)} → ${mb(statSync(output).size)}`);
}
