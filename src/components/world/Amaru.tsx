import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Box3, LoopOnce, MathUtils, Mesh, Vector3, type AnimationAction, type Group } from "three";
import { AMARU_HEIGHT } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { worldRuntime } from "./three/worldRuntime";

const MODEL = "/models/cat-somali-dreamnoms.glb";
const CLIP = {
  idle: "Idle",
  walk: "WalkClean",
  sitDown: "SitDown",
  sitting: "SittingIdle",
  standUp: "StandUp",
} as const;
/** Seconds idle before sitting. */
const SIT_AFTER = 1.2;
const FADE = 0.25;

/** walk → stand → sit; asked to move while sitting, he stands up first. */
type Pose = "walk" | "stand" | "sitDown" | "sitting" | "standUp";
/** Speed matching walk timeScale 1 (by eye). */
const WALK_SPEED = 1.6;
/** Path meshes sit above the terrain. */
const PAW_CLEARANCE = 0.07;
/** The model faces -Z. */
const FACING_OFFSET = Math.PI;

useGLTF.preload(MODEL);

export function Amaru() {
  const root = useRef<Group>(null);
  const gltf = useGLTF(MODEL);
  const { actions } = useAnimations(gltf.animations, root);
  const pose = useRef<Pose>("stand");
  const current = useRef<AnimationAction | null>(null);
  const stillFor = useRef(0);
  const announced = useRef(false);

  // Lift so the paws (lowest point, not the origin) touch the ground.
  const { scale, lift } = useMemo(() => {
    const box = new Box3().setFromObject(gltf.scene);
    const s = AMARU_HEIGHT / Math.max(box.getSize(new Vector3()).y, 1e-6);
    return { scale: s, lift: -box.min.y * s };
  }, [gltf.scene]);

  useEffect(() => {
    gltf.scene.traverse((o) => {
      if (o instanceof Mesh) o.frustumCulled = false; // skinned bounds lag behind the pose
    });
    // One-shot clips hold their last pose.
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

    if (!announced.current) {
      announced.current = true;
      mapStore.set({ ready: true });
    }
  });

  return (
    <group ref={root}>
      {/* Scale the wrapper, not the cached scene, so remounts measure the same size. */}
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
