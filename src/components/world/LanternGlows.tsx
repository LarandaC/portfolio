import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, MeshBasicMaterial, SpriteMaterial, type Group } from "three";
import { DECOR, STATIONS } from "./const/worldLayout";
import { createGlowTexture } from "./three/createGlowTexture";
import { nightAmount } from "./three/nightAmount";
import { terrainHeight } from "./three/terrainHeight";
import { worldRuntime } from "./three/worldRuntime";

const WARM = "#ff9e45";
/** Height of the lantern's paper box above the ground (stone lantern, footprint 0.7). */
const LANTERN_LIGHT = 1.85;
/** The dock's own small lantern (see Dock). */
const DOCK_LIGHT = 1.15;

/**
 * Night light for every stone lantern without real lights (19 point lights would be too costly):
 * a warm halo at the paper box and a pool of light on the ground, both fading in after dusk.
 */
export function LanternGlows() {
  const root = useRef<Group>(null);
  const texture = useMemo(() => createGlowTexture(), []);
  const halo = useMemo(
    () => new SpriteMaterial({ map: texture, color: WARM, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }),
    [texture]
  );
  const pool = useMemo(
    () => new MeshBasicMaterial({ map: texture, color: WARM, blending: AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }),
    [texture]
  );

  const spots = useMemo(() => {
    const lanterns = DECOR.filter((d) => d.file.includes("stone-lantern")).map(({ position: [x, z] }) => ({
      x,
      z,
      ground: terrainHeight(x, z).height,
      light: LANTERN_LIGHT,
    }));
    const dock = STATIONS.find((s) => s.building.kind === "dock");
    if (dock) {
      // Matches the tōrō's offset inside Dock (1.5 right, 2.2 towards the shore), rotated to face the door.
      const [bx, bz] = dock.building.position;
      const yaw = Math.atan2(dock.door[0] - bx, dock.door[1] - bz);
      const x = bx + Math.cos(yaw) * 1.5 + Math.sin(yaw) * 2.2;
      const z = bz - Math.sin(yaw) * 1.5 + Math.cos(yaw) * 2.2;
      lanterns.push({ x, z, ground: 0, light: DOCK_LIGHT }); // the dock sits at water level
    }
    return lanterns;
  }, []);

  useEffect(
    () => () => {
      texture.dispose();
      halo.dispose();
      pool.dispose();
    },
    [texture, halo, pool]
  );

  useFrame(({ clock }) => {
    const night = nightAmount(worldRuntime.timeOfDay);
    // A gentle shared flicker, like candles behind paper.
    const flicker = 0.92 + Math.sin(clock.elapsedTime * 7.3) * 0.04 + Math.sin(clock.elapsedTime * 13.1) * 0.04;
    halo.opacity = night * 0.9 * flicker;
    pool.opacity = night * 0.35 * flicker;
    if (root.current) root.current.visible = night > 0.01;
  });

  return (
    <group ref={root}>
      {spots.map(({ x, z, ground, light }, i) => (
        <group key={i} position={[x, ground, z]}>
          <sprite material={halo} position-y={light} scale={1.6} />
          <mesh material={pool} rotation-x={-Math.PI / 2} position-y={0.08}>
            <planeGeometry args={[3.4, 3.4]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
