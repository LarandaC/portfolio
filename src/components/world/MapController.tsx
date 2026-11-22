import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { SCREEN_RIGHT, SCREEN_UP, STATIONS, type StationId } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { isBlocked } from "./three/isBlocked";
import { screenOverflow } from "./three/screenOverflow";
import { planRoute } from "./three/planRoute";
import { terrainHeight } from "./three/terrainHeight";
import { worldRuntime } from "./three/worldRuntime";
import { sampleTimeOfDay } from "./three/timeOfDay";
import { nightAmount } from "./three/nightAmount";

/** World units per second. */
const WALK = 3;
/** Trot when heading to a building. */
const TROT = 5;
const DOOR_RADIUS = 1.6;
const FORWARD = new Vector3(SCREEN_UP[0], 0, SCREEN_UP[1]);
const RIGHT = new Vector3(SCREEN_RIGHT[0], 0, SCREEN_RIGHT[1]);

const KEYS: Record<string, [number, number]> = {
  ArrowUp: [0, 1], KeyW: [0, 1],
  ArrowDown: [0, -1], KeyS: [0, -1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0],
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export function MapController() {
  const pressed = useRef(new Set<string>());
  const route = useRef<Vector3[]>([]);
  const destination = useRef<StationId | null>(null);
  const move = useRef(new Vector3());

  useEffect(() => {
    const [x, z] = STATIONS[0].door;
    worldRuntime.position.set(x, terrainHeight(x, z).height, z);
    worldRuntime.heading = Math.atan2(1, 1); // facing the camera
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isTyping(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (KEYS[e.code]) {
        pressed.current.add(e.code);
        e.preventDefault();
      } else if ((e.code === "Enter" || e.code === "KeyE") && !mapStore.get().panel) {
        const nearby = mapStore.get().nearby;
        if (nearby) mapStore.set({ panel: nearby, introOpen: false });
      }
    };
    const up = (e: KeyboardEvent) => pressed.current.delete(e.code);
    const blur = () => pressed.current.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const stop = () => {
    route.current = [];
    destination.current = null;
    mapStore.set({ target: null });
  };

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.05);
    const pos = worldRuntime.position;

    worldRuntime.timeOfDay = MathUtils.damp(worldRuntime.timeOfDay, mapStore.get().night ? 2 : 0, 1.5, dt);
    sampleTimeOfDay(worldRuntime.timeOfDay, worldRuntime.tod);
    worldRuntime.night = nightAmount(worldRuntime.timeOfDay);

    const command = mapStore.takeCommand();
    if (command?.type === "station") {
      route.current = planRoute(pos, command.id);
      destination.current = command.id;
    } else if (command?.type === "point") {
      route.current = [new Vector3(command.x, 0, command.z)];
      destination.current = null;
    }

    let ix = 0;
    let iy = 0;
    pressed.current.forEach((code) => {
      ix += KEYS[code][0];
      iy += KEYS[code][1];
    });
    let speed = 0;
    if (ix || iy) {
      stop();
      move.current.copy(FORWARD).multiplyScalar(iy).addScaledVector(RIGHT, ix).normalize();
      speed = WALK;
      mapStore.set({ panel: null, introOpen: false });
    } else if (route.current.length) {
      const next = route.current[0];
      move.current.set(next.x - pos.x, 0, next.z - pos.z);
      const distance = move.current.length();
      if (distance < 0.25) {
        route.current.shift();
        if (!route.current.length && destination.current) {
          mapStore.set({ panel: destination.current, nearby: destination.current, target: null });
          destination.current = null;
        }
      } else {
        move.current.divideScalar(distance);
        speed = destination.current ? TROT : WALK;
      }
    }

    worldRuntime.wantsToMove = speed > 0;
    if (!worldRuntime.canMove) speed = 0;

    // A step may not carry him further off-screen (stepping back in is allowed, so he can't get stuck).
    const overflowNow = screenOverflow(pos.x, pos.y, pos.z, camera);
    const blocked = (x: number, z: number) =>
      isBlocked(x, z) || screenOverflow(x, pos.y, z, camera) > Math.max(overflowNow, 0) + 1e-4;

    // Slide along obstacles.
    if (speed > 0) {
      const step = speed * dt;
      const nx = pos.x + move.current.x * step;
      const nz = pos.z + move.current.z * step;
      if (!blocked(nx, nz)) pos.set(nx, pos.y, nz);
      else if (!blocked(nx, pos.z)) pos.x = nx;
      else if (!blocked(pos.x, nz)) pos.z = nz;
      else {
        speed = 0;
        stop();
      }
      if (speed > 0) worldRuntime.heading = Math.atan2(move.current.x, move.current.z);
    }
    worldRuntime.speed = speed;
    pos.y = terrainHeight(pos.x, pos.z).height;

    const at = STATIONS.find(({ door: [x, z] }) => Math.hypot(pos.x - x, pos.z - z) < DOOR_RADIUS);
    mapStore.set({ nearby: at?.id ?? null });
  }, -2);

  return null;
}
