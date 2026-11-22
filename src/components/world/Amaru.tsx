import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Box3, LoopOnce, MathUtils, Mesh, Vector3, type AnimationAction, type Group } from "three";
import { AMARU_HEIGHT } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { worldRuntime } from "./three/worldRuntime";

const MODEL = "/models/cat-somali-dreamnoms.glb";
/** Clips in the Somali model (DreamNoms). */
const CLIP = {
  idle: "Idle",
  walk: "WalkClean",
  sitDown: "SitDown",
  sitting: "SittingIdle",
  standUp: "StandUp",
} as const;
/** Seconds standing still before he sits down. */
const SIT_AFTER = 1.2;
const FADE = 0.25;

/**
 * walk → stand (Idle) → after a moment sit down → stay sitting.
 * Asked to move while sitting (or sitting down): stand up first, then walk.
 */
type Pose = "walk" | "stand" | "sitDown" | "sitting" | "standUp";
/** World units per second that look natural at walk timeScale 1 (tuned by eye). */
const WALK_SPEED = 1.6;
/** Material of the stray floor cube bundled with the Somali model. */
const STRAY_FLOOR = "material_0";
/** Height of the path and plaza meshes above the terrain (see WorldPathRibbon), plus a hair. */
const PAW_CLEARANCE = 0.07;
/** The Somali model's nose points along -Z, so turn it around to face where it walks. */
const FACING_OFFSET = Math.PI;

useGLTF.preload(MODEL);

/**
 * Amaru: placed by MapController, turns smoothly, walks in step with his speed, and when left alone
 * sits down; he stands up again before walking off.
 */
export function Amaru() {
  const root = useRef<Group>(null);
  const gltf = useGLTF(MODEL);
  const { actions } = useAnimations(gltf.animations, root);
  const pose = useRef<Pose>("stand");
  const current = useRef<AnimationAction | null>(null);
  const stillFor = useRef(0);
  const announced = useRef(false);

  // Scale to AMARU_HEIGHT and lift so the paws (the model's lowest point, not its origin) touch the ground.
  const { scale, lift } = useMemo(() => {
    // The download ships a flattened cube under the cat as a floor ("material_0"): it showed as a pale
    // square and skewed the measurements, so it goes before measuring.
    const floors: Mesh[] = [];
    gltf.scene.traverse((o) => {
      if (o instanceof Mesh && !Array.isArray(o.material) && o.material.name === STRAY_FLOOR) floors.push(o);
    });
    floors.forEach((mesh) => mesh.removeFromParent());
    const box = new Box3().setFromObject(gltf.scene);
    const s = AMARU_HEIGHT / Math.max(box.getSize(new Vector3()).y, 1e-6);
    return { scale: s, lift: -box.min.y * s };
  }, [gltf.scene]);

  useEffect(() => {
    gltf.scene.traverse((o) => {
      if (o instanceof Mesh) o.frustumCulled = false; // skinned bounds lag behind the pose
    });
    // The one-shot clips hold their last pose until the next clip fades in.
    for (const name of [CLIP.sitDown, CLIP.standUp]) {
      const action = actions[name];
      if (action) {
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
      }
    }
    current.current = actions[CLIP.idle] ?? null;
    current.current?.reset().play();
  }, [gltf.scene, actions]);

  useFrame((_, delta) => {
    const group = root.current;
    if (!group) return;
    const dt = Math.min(delta, 0.05);
    const { position, heading, speed } = worldRuntime;

    group.position.copy(position);
    let diff = heading + FACING_OFFSET - group.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // shortest turn
    group.rotation.y += diff * (1 - Math.exp(-10 * dt));

    // Pose machine.
    const play = (next: Pose, clip: string) => {
      const to = actions[clip];
      if (!to) return;
      pose.current = next;
      to.reset().play();
      if (current.current && current.current !== to) current.current.crossFadeTo(to, FADE, false);
      current.current = to;
    };
    const finished = (clip: string) => {
      const action = actions[clip];
      return !action || action.time >= action.getClip().duration - 0.01;
    };
    const wants = worldRuntime.wantsToMove;

    switch (pose.current) {
      case "walk":
        if (speed < 0.1 && !wants) {
          stillFor.current = 0;
          play("stand", CLIP.idle);
        }
        break;
      case "stand":
        stillFor.current += dt;
        if (wants) play("walk", CLIP.walk);
        else if (stillFor.current > SIT_AFTER) play("sitDown", CLIP.sitDown);
        break;
      case "sitDown":
        if (wants) play("standUp", CLIP.standUp);
        else if (finished(CLIP.sitDown)) play("sitting", CLIP.sitting);
        break;
      case "sitting":
        if (wants) play("standUp", CLIP.standUp);
        break;
      case "standUp":
        if (finished(CLIP.standUp)) {
          stillFor.current = 0;
          if (wants) play("walk", CLIP.walk);
          else play("stand", CLIP.idle);
        }
        break;
    }
    worldRuntime.canMove = pose.current === "walk" || pose.current === "stand";

    const walk = actions[CLIP.walk];
    if (walk) walk.timeScale = MathUtils.clamp(speed / WALK_SPEED, 0.8, 3);

    // The map is ready once Amaru has been drawn.
    if (!announced.current) {
      announced.current = true;
      mapStore.set({ ready: true });
    }
  });

  return (
    <group ref={root}>
      {/* Scale on a wrapper, never on the cached scene, so remounting measures the same size. */}
      {/* PAW_CLEARANCE keeps the paws above the path and plaza meshes, which sit a little over the terrain. */}
      <group scale={scale} position-y={lift + PAW_CLEARANCE}>
        <primitive object={gltf.scene} />
      </group>
      <mesh rotation-x={-Math.PI / 2} position-y={PAW_CLEARANCE + 0.01}>
        <circleGeometry args={[0.3, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}
