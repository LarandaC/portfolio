import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, type PerspectiveCamera } from "three";
import { mapStore, ZOOM } from "./mapStore";
import { worldRuntime } from "./three/worldRuntime";
import { SCREEN_UP } from "./const/worldLayout";

/** From the south-east, ~40° above the ground. */
const DIRECTION = new Vector3(-SCREEN_UP[0], 1.2 * Math.SQRT1_2, -SCREEN_UP[1]).normalize();
/** Framed when fully zoomed out. */
const VALLEY_CENTER = new Vector3(-1.5, 1, -1.5);

/** Follows Amaru from a fixed diagonal; wheel, pinch or HUD buttons zoom. */
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
    // The map owns touch gestures (no page zoom/scroll).
    let pinch = 0;
    const spread = (e: TouchEvent) =>
      Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) pinch = spread(e);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || !pinch) return;
      e.preventDefault();
      const now = spread(e);
      mapStore.zoomBy(pinch / now);
      pinch = now;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch = 0;
    };
    el.style.touchAction = "none";
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl]);

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const k = 1 - Math.exp(-3 * dt);
    distance.current += (mapStore.get().zoom - distance.current) * k;
    // Far out, drift to the valley's centre.
    const overview = MathUtils.smoothstep(distance.current, ZOOM.initial * 1.6, ZOOM.max);
    target.current.copy(worldRuntime.position).lerp(VALLEY_CENTER, overview);

    if (!ready.current) {
      look.current.copy(target.current);
      ready.current = true;
    } else {
      look.current.lerp(target.current, k);
    }
    // Portrait: back off further so the valley fits.
    const aspect = (camera as PerspectiveCamera).aspect;
    const fit = aspect < 1 ? MathUtils.lerp(1, 1 / aspect, overview) : 1;
    camera.position.copy(look.current).addScaledVector(DIRECTION, distance.current * fit);
    camera.lookAt(look.current.x, look.current.y + 0.3, look.current.z);
  });

  return null;
}
