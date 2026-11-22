import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { STATIONS, type StationId } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { isBlocked } from "./three/isBlocked";
import { planRoute } from "./three/planRoute";
import { terrainHeight } from "./three/terrainHeight";
import { worldRuntime } from "./three/worldRuntime";

/** Free walking speed (keyboard, clicks on the ground), world units per second. */
const WALK = 3;
/** Faster trot when heading to a building along the path. */
const TROT = 5;
/** Standing this close to a door counts as "at" that station. */
const DOOR_RADIUS = 1.6;
/** Isometric camera axes on the ground: screen-up and screen-right. */
const FORWARD = new Vector3(-1, 0, -1).normalize();
const RIGHT = new Vector3(1, 0, -1).normalize();

const KEYS: Record<string, [number, number]> = {
  ArrowUp: [0, 1], KeyW: [0, 1],
  ArrowDown: [0, -1], KeyS: [0, -1],
  ArrowLeft: [-1, 0], KeyA: [-1, 0],
  ArrowRight: [1, 0], KeyD: [1, 0],
};

/** True when typing in a field, so arrows/WASD don't move Amaru. */
const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * Moves Amaru: arrows/WASD walk freely; a station command walks the path and opens its panel on arrival;
 * a ground click walks straight there. Water, buildings and the valley's edge block the way.
 */
export function MapController() {
  const pressed = useRef(new Set<string>());
  const route = useRef<Vector3[]>([]);
  const destination = useRef<StationId | null>(null);
  const move = useRef(new Vector3());

  // Start in the plaza, by the torii.
  useEffect(() => {
    const [x, z] = STATIONS[0].door;
    worldRuntime.position.set(x, terrainHeight(x, z).height, z);
    worldRuntime.heading = Math.atan2(1, 1); // facing the camera, through the torii
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

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const pos = worldRuntime.position;

    // Time of day eases towards the theme's: afternoon by day, night in the dark theme.
    worldRuntime.timeTarget = mapStore.get().night ? 5 : 3;
    worldRuntime.timeOfDay = MathUtils.damp(worldRuntime.timeOfDay, worldRuntime.timeTarget, 1.5, dt);

    // New command from the UI or a click.
    const command = mapStore.takeCommand();
    if (command?.type === "station") {
      route.current = planRoute(pos, command.id);
      destination.current = command.id;
    } else if (command?.type === "point") {
      route.current = [new Vector3(command.x, 0, command.z)];
      destination.current = null;
    }

    // Keyboard wins over any route.
    let ix = 0;
    let iy = 0;
    pressed.current.forEach((code) => {
      ix += KEYS[code][0];
      iy += KEYS[code][1];
    });
    let speed = 0;
    if (ix || iy) {
      route.current = [];
      destination.current = null;
      move.current.copy(FORWARD).multiplyScalar(iy).addScaledVector(RIGHT, ix).normalize();
      speed = WALK;
      const s = mapStore.get();
      if (s.panel || s.introOpen) mapStore.set({ panel: null, introOpen: false });
    } else if (route.current.length) {
      const next = route.current[0];
      move.current.set(next.x - pos.x, 0, next.z - pos.z);
      const distance = move.current.length();
      if (distance < 0.25) {
        route.current.shift();
        if (!route.current.length && destination.current) {
          mapStore.set({ panel: destination.current, nearby: destination.current });
          destination.current = null;
        }
      } else {
        move.current.divideScalar(distance);
        speed = destination.current ? TROT : WALK;
      }
    }

    // Amaru gets up before walking off: hold still while he's sitting or standing up.
    worldRuntime.wantsToMove = speed > 0;
    if (!worldRuntime.canMove) speed = 0;

    // Step, sliding along obstacles instead of stopping dead.
    if (speed > 0) {
      const step = speed * dt;
      const nx = pos.x + move.current.x * step;
      const nz = pos.z + move.current.z * step;
      if (!isBlocked(nx, nz)) pos.set(nx, pos.y, nz);
      else if (!isBlocked(nx, pos.z)) pos.x = nx;
      else if (!isBlocked(pos.x, nz)) pos.z = nz;
      else {
        speed = 0;
        route.current = [];
        destination.current = null;
      }
      if (speed > 0) worldRuntime.heading = Math.atan2(move.current.x, move.current.z);
    }
    worldRuntime.speed = speed;
    pos.y = terrainHeight(pos.x, pos.z).height;

    // Which door (if any) Amaru stands at.
    const at = STATIONS.find(({ door: [x, z] }) => Math.hypot(pos.x - x, pos.z - z) < DOOR_RADIUS);
    const nearby = at?.id ?? null;
    if (nearby !== mapStore.get().nearby) mapStore.set({ nearby });
  }, -2);

  return null;
}
