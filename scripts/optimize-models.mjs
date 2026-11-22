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

/**
 * Models published to the site. Anything not listed here stays local only.
 * `keepMaterials`: don't merge materials into a palette, so they keep their names
 * (e.g. the cat's "Collar" or "EyeColor" can be recolored by code).
 * `textureSize`: max texture side in px (default 1024); smaller for props seen small or repeated.
 * `simplify`: keep this fraction of the triangles (e.g. 0.1), for heavy models seen from far away
 *   (with a loose error tolerance, otherwise the simplifier stops early).
 */
const MODELS = [
  // Amaru candidates
  { src: "cat/an_animated_cat.glb", out: "cat-evil-katz.glb", keepMaterials: true },
  { src: "cat/Cat by madtrollstudio - YvVobPlTlQ.glb", out: "cat-madtrollstudio.glb", keepMaterials: true },
  { src: "cat/low_poly_cat.glb", out: "cat-volkanongun.glb", keepMaterials: true },
  { src: "cat/low_poly_cat_walk.glb", out: "cat-volkanongun-walk.glb", keepMaterials: true },
  { src: "cat/tuxedo_cat_animated_2.0.glb", out: "cat-tuxedo-dreamnoms.glb", keepMaterials: true },
  { src: "cat/somali_cat_animated_ver_1.2.glb", out: "cat-somali-dreamnoms.glb", keepMaterials: true },
  // Buildings
  { src: "house/Pagoda by Poly by Google - d1M5ncMBUDi.glb", out: "pagoda.glb" },
  { src: "house/japanese_house.glb", out: "house-daniel-stringer.glb" },
  { src: "house/japanese_house (1).glb", out: "house-ig-shero.glb" },
  { src: "house/simple_japanese_house_2.glb", out: "house-janab.glb" },
  { src: "house/japanese_shrine.glb", out: "shrine-wolvemancer.glb" },
  // 15 texture maps: 512 px keeps it light.
  { src: "house/japanese_bell_tower.glb", out: "bell-tower-ao-interactive.glb", textureSize: 512 },
  // Decor
  { src: "decor/japanese_stone_lantern.glb", out: "stone-lantern-sahir-virmani.glb", textureSize: 512 },
  { src: "decor/japanese_maple_tree.glb", out: "maple-olivermathegames.glb" },
  // Left out on purpose:
  //   cat/cat_walk.glb                         CC-BY-NC: non-commercial license
  //   cat/low-poly_catwalk.glb                 a fashion runway ("catwalk"), not a cat
  //   house/feudal_japanese_house.glb          ~373k triangles, too heavy for the web
  //   house/traditional_japanese_house.glb     ~814k triangles, too heavy for the web
  //   house/japanese_castle.glb                ~344k triangles in thousands of small parts: won't simplify
  //                                            below ~200k (4.5 MB), too heavy even as a backdrop
];

const force = process.argv.includes("--force");
const mb = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`;
// Run the CLI's own script with Node: no shell, so paths with spaces stay intact on Windows too.
const cli = join("node_modules", "@gltf-transform", "cli", "bin", "cli.js");

mkdirSync(OUT, { recursive: true });

for (const { src, out, keepMaterials, textureSize = 1024, simplify } of MODELS) {
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
      "--texture-size", String(textureSize),
      ...(keepMaterials ? ["--palette", "false"] : []),
      ...(simplify ? ["--simplify-ratio", String(simplify), "--simplify-error", "0.05"] : []),
    ],
    { stdio: ["ignore", "ignore", "inherit"] } // errors still show
  );
  console.log(`✓  ${out}: ${mb(statSync(input).size)} → ${mb(statSync(output).size)}`);
}
