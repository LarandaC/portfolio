import type { ThreeEvent } from "@react-three/fiber";

type DockProps = {
  position: [number, number, number];
  rotationY: number;
  onSelect: () => void;
};

const WOOD = "#9b7457";
const STONE = "#b8b2a8";

/** Wooden dock reaching into the lake with a stone lantern at its root: Contacto. */
export function Dock({ position, rotationY, onSelect }: DockProps) {
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <group
      position={position}
      rotation-y={rotationY}
      onClick={click}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {/* Deck: from the shore (+Z) out over the water (-Z) */}
      <mesh position={[0, 0.12, -1]}>
        <boxGeometry args={[1.6, 0.14, 6]} />
        <meshToonMaterial color={WOOD} />
      </mesh>
      {[-2.8, -0.8, 1.2].flatMap((z) =>
        [-0.7, 0.7].map((x) => (
          <mesh key={`${x}${z}`} position={[x, -0.4, z]}>
            <cylinderGeometry args={[0.09, 0.09, 1.2, 8]} />
            <meshToonMaterial color={WOOD} />
          </mesh>
        ))
      )}
      {/* Tōrō: stone lantern beside the dock */}
      <group position={[1.5, 0, 2.2]}>
        <mesh position-y={0.15}>
          <boxGeometry args={[0.6, 0.3, 0.6]} />
          <meshToonMaterial color={STONE} />
        </mesh>
        <mesh position-y={0.65}>
          <cylinderGeometry args={[0.12, 0.14, 0.7, 8]} />
          <meshToonMaterial color={STONE} />
        </mesh>
        <mesh position-y={1.15}>
          <boxGeometry args={[0.5, 0.36, 0.5]} />
          <meshToonMaterial color="#ffd68a" emissive="#ffb347" emissiveIntensity={0.6} />
        </mesh>
        <mesh position-y={1.48}>
          <coneGeometry args={[0.55, 0.36, 4]} />
          <meshToonMaterial color={STONE} />
        </mesh>
      </group>
    </group>
  );
}
