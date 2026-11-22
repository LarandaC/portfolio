import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, ContactShadows, OrbitControls } from "@react-three/drei";
import type { LabSky } from "./const/labModels";

type LabViewerProps = {
  sky: LabSky;
  /** Changing it re-frames the camera. */
  fitKey: string;
  children: ReactNode;
};

export function LabViewer({ sky, fitKey, children }: LabViewerProps) {
  return (
    <div className="relative size-full" style={{ background: `linear-gradient(to bottom, ${sky.top}, ${sky.bottom})` }}>
      {/* three r0.187 dropped PCFSoftShadowMap; "percentage" = PCFShadowMap */}
      <Canvas shadows="percentage" dpr={[1, 2]} camera={{ position: [2.5, 1.6, 3.5], fov: 40, near: 0.01, far: 500 }} gl={{ alpha: true }}>
        <hemisphereLight args={[sky.top, sky.bottom, 1.1]} />
        <directionalLight
          position={[4, 6, 3]}
          color={sky.light}
          intensity={sky.intensity}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Suspense fallback={null}>
          <Bounds key={fitKey} fit clip observe margin={1.3}>
            {children}
          </Bounds>
          <ContactShadows position={[0, 0.001, 0]} scale={20} blur={2.4} far={10} opacity={0.45} />
        </Suspense>
        <OrbitControls makeDefault target={[0, 0.5, 0]} />
      </Canvas>
    </div>
  );
}
