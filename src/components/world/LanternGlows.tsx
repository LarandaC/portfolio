import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, MeshBasicMaterial, SpriteMaterial, type Group } from "three";
import { DECOR, DOCK_LANTERN, STATIONS, stationYaw } from "./const/worldLayout";
import { createGlowTexture } from "./three/createGlowTexture";
import { terrainHeight } from "./three/terrainHeight";
import { worldRuntime } from "./three/worldRuntime";

const WARM = "#ff9e45";
/** Paper box height (footprint 0.7). */
const LANTERN_LIGHT = 1.85;

/** Fake lantern light (halo + ground pool): 19 point lights would be too costly. */
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
    const lanterns = DECOR.filter((d) => d.glow).map(({ position: [x, z] }) => ({
      x,
      z,
      ground: terrainHeight(x, z).height,
      light: LANTERN_LIGHT,
    }));
    const dock = STATIONS.find((s) => s.building.kind === "dock");
    if (dock) {
      // DOCK_LANTERN is in the dock's space.
      const [bx, bz] = dock.building.position;
      const [ox, oz] = DOCK_LANTERN.offset;
      const yaw = stationYaw(dock);
      const x = bx + Math.cos(yaw) * ox + Math.sin(yaw) * oz;
      const z = bz - Math.sin(yaw) * ox + Math.cos(yaw) * oz;
      lanterns.push({ x, z, ground: 0, light: DOCK_LANTERN.lightHeight });
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
    const night = worldRuntime.night;
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
