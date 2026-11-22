import { useEffect, useMemo, useRef } from "react";
import { Center, useAnimations, useGLTF } from "@react-three/drei";
import { Mesh, type AnimationAction, type AnimationClip, type AnimationMixer, type Group } from "three";
import { applyToonMaterials } from "./three/applyToonMaterials";
import { getToonGradient } from "@/lib/three/getToonGradient";
import { getModelStats, type ModelStats } from "./three/getModelStats";

export type LoadedModel = {
  stats: ModelStats;
  clips: AnimationClip[];
  mixer: AnimationMixer;
  actions: Record<string, AnimationAction | null>;
};

type LabModelViewProps = {
  file: string;
  toon: boolean;
  /** Omitted = real size. */
  targetHeight?: number;
  autoplay?: boolean;
  onLoaded?: (model: LoadedModel) => void;
};

export function LabModelView({ file, toon, targetHeight, autoplay, onLoaded }: LabModelViewProps) {
  const gltf = useGLTF(file);
  const group = useRef<Group>(null);
  const { actions, mixer, clips } = useAnimations(gltf.animations, group);
  const gradient = getToonGradient();
  const stats = useMemo(() => getModelStats(gltf.scene), [gltf.scene]);
  const scale = targetHeight ? targetHeight / Math.max(stats.size.height, 1e-6) : 1;

  useEffect(() => {
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) object.castShadow = true;
    });
  }, [gltf.scene]);

  useEffect(() => applyToonMaterials(gltf.scene, toon, gradient), [gltf.scene, toon, gradient]);

  useEffect(() => {
    onLoaded?.({ stats, clips, mixer, actions });
  }, [onLoaded, stats, clips, mixer, actions]);

  useEffect(() => {
    if (!autoplay || !clips.length) return;
    const action = actions[clips[0].name];
    action?.reset().play();
    return () => {
      action?.stop();
    };
  }, [autoplay, clips, actions]);

  return (
    <Center top cacheKey={`${file}-${scale}`}>
      <group ref={group} scale={scale}>
        <primitive object={gltf.scene} />
      </group>
    </Center>
  );
}
