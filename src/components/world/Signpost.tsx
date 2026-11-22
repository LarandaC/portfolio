import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MeshToonMaterial } from "three";
import { getToonGradient } from "@/lib/three/getToonGradient";
import { SCREEN_UP, type Signpost as SignpostData } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { createSignTexture, SIGN_TEXTURE } from "./three/createSignTexture";
import { terrainHeight } from "./three/terrainHeight";
import { useClickable } from "./useClickable";

const BOARD_W = 2.2;
const BOARD_H = (BOARD_W * SIGN_TEXTURE.height) / SIGN_TEXTURE.width;
const BOARD_Y = 1.35;
const POST_H = 1.75;
const BOARD_OFFSET = BOARD_W / 2 - 0.25;
const FONT = "'Inter Tight', sans-serif";
const VIEW = SCREEN_UP;
/** Min |sin| between board and view (~50°). */
const MIN_FACING = Math.sin((50 * Math.PI) / 180);

/** Yaw along (dx, dz), turned up to 60° so it's never edge-on to the camera. */
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

/** Clicking it sends Amaru there. */
export function Signpost({ stationId, labelKey, position: [x, z], direction: [dx, dz] }: SignpostData) {
  const { t } = useTranslation();
  const label = t(labelKey);
  const handlers = useClickable(() => mapStore.goTo(stationId));
  // Wait for the page font, or the canvas falls back to a system one.
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
    const gradientMap = getToonGradient();
    const board = (pointsRight: boolean) =>
      new MeshToonMaterial({ map: createSignTexture(label, pointsRight, FONT), gradientMap, alphaTest: 0.5 });
    return {
      front: board(true),
      back: board(false),
      post: new MeshToonMaterial({ color: "#7a5032", gradientMap }),
    };
  }, [label, fontReady]);

  useEffect(
    () => () => {
      if (!materials) return;
      materials.front.map?.dispose();
      materials.back.map?.dispose();
      materials.front.dispose();
      materials.back.dispose();
      materials.post.dispose();
    },
    [materials]
  );

  if (!materials) return null;

  const yaw = boardYaw(dx, dz);
  const ground = terrainHeight(x, z).height;
  return (
    <group position={[x, ground, z]} {...handlers}>
      <mesh position-y={POST_H / 2} material={materials.post}>
        <cylinderGeometry args={[0.07, 0.09, POST_H, 8]} />
      </mesh>
      <group position-y={BOARD_Y} rotation-y={yaw}>
        {/* Two faces back to back, both readable and pointing along the path. */}
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
