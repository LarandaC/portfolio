import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, type PerspectiveCamera } from "three";
import { mapStore, ZOOM } from "./mapStore";
import { worldRuntime } from "./three/worldRuntime";

/** Isometric-style viewing direction: from the south-east, about 40° above the ground. */
const DIRECTION = new Vector3(1, 1.2, 1).normalize();
/** Middle of the valley: what the camera frames when zoomed all the way out. */
const VALLEY_CENTER = new Vector3(-1.5, 1, -1.5);

/**
 * Diorama camera: looks at Amaru from a fixed diagonal and eases after him. The wheel (or the HUD
 * buttons) zooms; fully zoomed out it frames the whole valley.
 */
export function MapCamera() {
  const { gl } = useThree();
  const look = useRef(new Vector3());
  const distance = useRef(mapStore.get().zoom);
  const ready = useRef(false);
  const target = useRef(new Vector3());

  useEffect(() => {
    const el = gl.domElement;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      mapStore.zoomBy(e.deltaY > 0 ? 1.12 : 1 / 1.12);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [gl]);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-3 * dt);
    distance.current += (mapStore.get().zoom - distance.current) * k;
    // Close in: follow Amaru. Far out: drift to the valley's centre so the whole map fits.
    const overview = MathUtils.smoothstep(distance.current, ZOOM.initial * 1.6, ZOOM.max);
    target.current.copy(worldRuntime.position).lerp(VALLEY_CENTER, overview);

    if (!ready.current) {
      look.current.copy(target.current);
      ready.current = true;
    } else {
      look.current.lerp(target.current, k);
    }
    // Portrait screens are narrow: back off further when zoomed out so the valley still fits.
    const aspect = (camera as PerspectiveCamera).aspect;
    const fit = aspect < 1 ? MathUtils.lerp(1, 1 / aspect, overview) : 1;
    camera.position.copy(look.current).addScaledVector(DIRECTION, distance.current * fit);
    camera.lookAt(look.current.x, look.current.y + 0.3, look.current.z);
  });

  return null;
}
