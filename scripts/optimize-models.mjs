/**
 * Optimizes assets-src/ models (Meshopt + WebP) into public/models (site) and dev-models (lab only, not built).
 * `npm run models` (changed only) · `npm run models -- --force` (all). Credits: assets-src/CREDITS.md.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune } from "@gltf-transform/functions";

const SRC = "assets-src";
const OUT = "public/models";
const LAB_OUT = "dev-models";

/**
 * keepMaterials: keep material names (recoloring) · textureSize: px (default 1024) · removeMaterials: drop junk
 * primitives · labOnly: to dev-models · simplify: triangle ratio, for far-away models.
 */
const MODELS = [
  // Strip the floor cube bundled under the cat.
  { src: "cat/somali_cat_animated_ver_1.2.glb", out: "cat-somali-dreamnoms.glb", keepMaterials: true, removeMaterials: ["material_0"] },
  // Lab only
  { src: "cat/an_animated_cat.glb", out: "cat-evil-katz.glb", keepMaterials: true, labOnly: true },
  { src: "cat/Cat by madtrollstudio - YvVobPlTlQ.glb", out: "cat-madtrollstudio.glb", keepMaterials: true, labOnly: true },
  { src: "cat/low_poly_cat.glb", out: "cat-volkanongun.glb", keepMaterials: true, labOnly: true },
  { src: "cat/low_poly_cat_walk.glb", out: "cat-volkanongun-walk.glb", keepMaterials: true, labOnly: true },
  { src: "cat/tuxedo_cat_animated_2.0.glb", out: "cat-tuxedo-dreamnoms.glb", keepMaterials: true, labOnly: true },
  { src: "house/Pagoda by Poly by Google - d1M5ncMBUDi.glb", out: "pagoda.glb" },
  // Seen only from afar: 512 px is enough.
  { src: "house/japanese_house.glb", out: "house-daniel-stringer.glb", textureSize: 512 },
  { src: "house/japanese_house (1).glb", out: "house-ig-shero.glb", textureSize: 512 },
  { src: "house/simple_japanese_house_2.glb", out: "house-janab.glb", textureSize: 512 },
  { src: "house/japanese_shrine.glb", out: "shrine-wolvemancer.glb", textureSize: 512 },
  // Small on screen: 256 px.
  { src: "house/japanese_bell_tower.glb", out: "bell-tower-ao-interactive.glb", textureSize: 256 },
  { src: "decor/japanese_stone_lantern.glb", out: "stone-lantern-sahir-virmani.glb", textureSize: 512 },
  { src: "decor/japanese_maple_tree.glb", out: "maple-olivermathegames.glb", textureSize: 512 },
  // Not published: cat_walk (CC-BY-NC), low-poly_catwalk (not a cat), feudal/traditional houses and
  // the castle (too many triangles).
];

const force = process.argv.includes("--force");
const mb = (bytes) => `${(bytes / 1048576).toFixed(2)} MB`;
// Run the CLI script with Node directly (no shell): safe with spaces in paths.
const cli = join("node_modules", "@gltf-transform", "cli", "bin", "cli.js");

mkdirSync(OUT, { recursive: true });
mkdirSync(LAB_OUT, { recursive: true });

/** Copy of `input` without the primitives that use `materials`, in a temp file. */
async function withoutMaterials(input, materials) {
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
  const doc = await io.read(input);
  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      if (materials.includes(prim.getMaterial()?.getName())) prim.dispose();
    }
  }
  await doc.transform(prune());
  const temp = join(tmpdir(), `optimize-${Date.now()}.glb`);
  await io.write(temp, doc);
  return temp;
}

for (const { src, out, keepMaterials, labOnly, removeMaterials, textureSize = 1024, simplify } of MODELS) {
  const source = join(SRC, src);
  const output = join(labOnly ? LAB_OUT : OUT, out);

  if (!existsSync(source)) {
    console.warn(`!  falta ${source} (descárgalo de nuevo, ver assets-src/CREDITS.md)`);
    continue;
  }
  if (!force && existsSync(output) && statSync(output).mtimeMs > statSync(source).mtimeMs) {
    console.log(`=  ${out} ya está al día`);
    continue;
  }

  const input = removeMaterials ? await withoutMaterials(source, removeMaterials) : source;
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
    { stdio: ["ignore", "ignore", "inherit"] }
  );
  if (input !== source) rmSync(input);
  console.log(`✓  ${out}: ${mb(statSync(source).size)} → ${mb(statSync(output).size)}`);
}
