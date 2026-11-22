import { DECOR } from "./const/worldLayout";
import { terrainHeight } from "./three/terrainHeight";
import { ModelBuilding } from "./ModelBuilding";

/** Decorative models around the valley (bell tower, maple, stone lanterns): no panel, not clickable. */
export function MapDecor() {
  return (
    <>
      {DECOR.map(({ file, position: [x, z], size, rotation }, i) => (
        <ModelBuilding
          key={`${file}-${i}`}
          file={file}
          size={size}
          position={[x, terrainHeight(x, z).height, z]}
          // Facing the plaza unless told otherwise.
          rotationY={rotation ?? Math.atan2(-x, -z)}
        />
      ))}
    </>
  );
}
