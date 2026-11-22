import { getToonGradient } from "@/lib/three/getToonGradient";
import { DOCK_LANTERN } from "./const/worldLayout";
import { useClickable } from "./useClickable";

type DockProps = {
  position: [number, number, number];
  rotationY: number;
  onSelect: () => void;
};

const WOOD = "#9b7457";
const STONE = "#b8b2a8";

/** Contacto. */
export function Dock({ position, rotationY, onSelect }: DockProps) {
  const handlers = useClickable(onSelect);
  const gradientMap = getToonGradient();

  return (
    <group position={position} rotation-y={rotationY} {...handlers}>
      <mesh position={[0, 0.12, -1]}>
        <boxGeometry args={[1.6, 0.14, 6]} />
        <meshToonMaterial gradientMap={gradientMap} color={WOOD} />
      </mesh>
      {[-2.8, -0.8, 1.2].flatMap((z) =>
        [-0.7, 0.7].map((x) => (
          <mesh key={`${x}${z}`} position={[x, -0.4, z]}>
            <cylinderGeometry args={[0.09, 0.09, 1.2, 8]} />
            <meshToonMaterial gradientMap={gradientMap} color={WOOD} />
          </mesh>
        ))
      )}
      <group position={[DOCK_LANTERN.offset[0], 0, DOCK_LANTERN.offset[1]]}>
        <mesh position-y={0.15}>
          <boxGeometry args={[0.6, 0.3, 0.6]} />
          <meshToonMaterial gradientMap={gradientMap} color={STONE} />
        </mesh>
        <mesh position-y={0.65}>
          <cylinderGeometry args={[0.12, 0.14, 0.7, 8]} />
          <meshToonMaterial gradientMap={gradientMap} color={STONE} />
        </mesh>
        <mesh position-y={DOCK_LANTERN.lightHeight}>
          <boxGeometry args={[0.5, 0.36, 0.5]} />
          <meshToonMaterial gradientMap={gradientMap} color="#ffd68a" emissive="#ffb347" emissiveIntensity={0.6} />
        </mesh>
        <mesh position-y={1.48}>
          <coneGeometry args={[0.55, 0.36, 4]} />
          <meshToonMaterial gradientMap={gradientMap} color={STONE} />
        </mesh>
      </group>
    </group>
  );
}
