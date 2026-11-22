import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ThreeEvent } from "@react-three/fiber";
import { MeshToonMaterial } from "three";
import { createToonGradient } from "@/lib/three/createToonGradient";
import type { Signpost as SignpostData } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { createSignTexture, SIGN_TEXTURE } from "./three/createSignTexture";
import { terrainHeight } from "./three/terrainHeight";

/** Board size in world units (same 4:1 aspect as its texture) and height on the post. */
const BOARD_W = 2.2;
const BOARD_H = (BOARD_W * SIGN_TEXTURE.height) / SIGN_TEXTURE.width;
const BOARD_Y = 1.35;
const POST_H = 1.75;
const BOARD_OFFSET = BOARD_W / 2 - 0.25;
const FONT = "'Inter Tight', sans-serif";
/** The map camera's viewing direction on the ground (see MapCamera): boards must not sit edge-on to it. */
const VIEW: [number, number] = [Math.SQRT1_2, Math.SQRT1_2];
/** Minimum |sin| between board and view: about 50°, enough to read the text comfortably. */
const MIN_FACING = Math.sin((50 * Math.PI) / 180);

/** Yaw for a board along (dx, dz), turned just enough (up to 60°) not to be seen edge-on. */
function boardYaw(dx: number, dz: number) {
  const base = Math.atan2(-dz, dx);
  const facing = (yaw: number) => Math.abs(Math.sin(yaw) * VIEW[0] + Math.cos(yaw) * VIEW[1]);
  for (let deg = 0; deg <= 60; deg++) {
    for (const sign of [1, -1]) {
      const yaw = base + (sign * deg * Math.PI) / 180;
      if (facing(yaw) >= MIN_FACING) return yaw;
    }
  }
  return base;
}

const setCursor = (value: string) => () => {
  document.body.style.cursor = value;
};

/** A wooden post with an arrow board naming the place the path leads to. Clicking it sends Amaru there. */
export function Signpost({ stationId, labelKey, position: [x, z], direction: [dx, dz] }: SignpostData) {
  const { t } = useTranslation();
  const label = t(labelKey);
  // Draw the text once the page font has loaded, so the canvas doesn't fall back to a system font.
  const [fontReady, setFontReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    document.fonts.load(`600 60px ${FONT}`).then(() => !cancelled && setFontReady(true), () => !cancelled && setFontReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const materials = useMemo(() => {
    if (!fontReady) return null;
    const gradientMap = createToonGradient();
    const board = (pointsRight: boolean) =>
      new MeshToonMaterial({ map: createSignTexture(label, pointsRight, FONT), gradientMap, alphaTest: 0.5 });
    return {
      front: board(true),
      back: board(false),
      post: new MeshToonMaterial({ color: "#7a5032", gradientMap }),
      gradientMap,
    };
  }, [label, fontReady]); // a new label (e.g. language change) redraws the boards

  useEffect(
    () => () => {
      if (!materials) return;
      materials.front.map?.dispose();
      materials.back.map?.dispose();
      materials.front.dispose();
      materials.back.dispose();
      materials.post.dispose();
      materials.gradientMap.dispose();
    },
    [materials]
  );

  if (!materials) return null;

  // The board's long side runs along the path (local +X onto (dx, dz)), twisted towards the camera if needed.
  const yaw = boardYaw(dx, dz);
  const ground = terrainHeight(x, z).height;
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    mapStore.goTo(stationId);
  };

  return (
    <group position={[x, ground, z]} onClick={click} onPointerOver={setCursor("pointer")} onPointerOut={setCursor("")}>
      <mesh position-y={POST_H / 2} material={materials.post}>
        <cylinderGeometry args={[0.07, 0.09, POST_H, 8]} />
      </mesh>
      <group position-y={BOARD_Y} rotation-y={yaw}>
        {/* Two faces back to back: each shows the arrow pointing along the path, text readable. */}
        {/* Square end at the post, the point reaching out towards the place. */}
        <mesh position={[BOARD_OFFSET, 0, 0.02]} material={materials.front}>
          <planeGeometry args={[BOARD_W, BOARD_H]} />
        </mesh>
        <mesh position={[BOARD_OFFSET, 0, -0.02]} rotation-y={Math.PI} material={materials.back}>
          <planeGeometry args={[BOARD_W, BOARD_H]} />
        </mesh>
      </group>
    </group>
  );
}
