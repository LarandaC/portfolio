/**
 * Optimizes the original 3D downloads in assets-src/ into small files:
 *   public/models/  → used by the site (published)
 *   dev-models/     → only for the /lab page (`labOnly`): served by the Vite dev server, not built
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
const LAB_OUT = "dev-models";

/**
 * Models published to the site. Anything not listed here stays local only.
 * `keepMaterials`: don't merge materials into a palette, so they keep their names
 * (e.g. the cat's "Collar" or "EyeColor" can be recolored by code).
 * `textureSize`: max texture side in px (default 1024); smaller for props seen small or repeated.
 * `labOnly`: only the dev lab uses it (the Amaru candidates that weren't picked); kept out of the build.
 * `simplify`: keep this fraction of the triangles (e.g. 0.1), for heavy models seen from far away
 *   (with a loose error tolerance, otherwise the simplifier stops early).
 */
const MODELS = [
  // Amaru
  { src: "cat/somali_cat_animated_ver_1.2.glb", out: "cat-somali-dreamnoms.glb", keepMaterials: true },
  // The other Amaru candidates (lab only)
  { src: "cat/an_animated_cat.glb", out: "cat-evil-katz.glb", keepMaterials: true, labOnly: true },
  { src: "cat/Cat by madtrollstudio - YvVobPlTlQ.glb", out: "cat-madtrollstudio.glb", keepMaterials: true, labOnly: true },
  { src: "cat/low_poly_cat.glb", out: "cat-volkanongun.glb", keepMaterials: true, labOnly: true },
  { src: "cat/low_poly_cat_walk.glb", out: "cat-volkanongun-walk.glb", keepMaterials: true, labOnly: true },
  { src: "cat/tuxedo_cat_animated_2.0.glb", out: "cat-tuxedo-dreamnoms.glb", keepMaterials: true, labOnly: true },
  // Buildings
  { src: "house/Pagoda by Poly by Google - d1M5ncMBUDi.glb", out: "pagoda.glb" },
  // Buildings are only seen from the isometric camera, never close up: 512 px is plenty and saves ~1 MB.
  { src: "house/japanese_house.glb", out: "house-daniel-stringer.glb", textureSize: 512 },
  { src: "house/japanese_house (1).glb", out: "house-ig-shero.glb", textureSize: 512 },
  { src: "house/simple_japanese_house_2.glb", out: "house-janab.glb", textureSize: 512 },
  { src: "house/japanese_shrine.glb", out: "shrine-wolvemancer.glb", textureSize: 512 },
  // 15 texture maps and small on screen: 256 px.
  { src: "house/japanese_bell_tower.glb", out: "bell-tower-ao-interactive.glb", textureSize: 256 },
  // Decor
  { src: "decor/japanese_stone_lantern.glb", out: "stone-lantern-sahir-virmani.glb", textureSize: 512 },
  { src: "decor/japanese_maple_tree.glb", out: "maple-olivermathegames.glb", textureSize: 512 },
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
mkdirSync(LAB_OUT, { recursive: true });

for (const { src, out, keepMaterials, labOnly, textureSize = 1024, simplify } of MODELS) {
  const input = join(SRC, src);
  const output = join(labOnly ? LAB_OUT : OUT, out);

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
