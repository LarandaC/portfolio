import { STATIONS, type Station } from "./const/worldLayout";
import { mapStore } from "./mapStore";
import { terrainHeight } from "./three/terrainHeight";
import { ModelBuilding } from "./ModelBuilding";
import { Dock } from "./Dock";
import { StationLabel } from "./StationLabel";

/** Yaw that turns a building's front (+Z) towards its door. */
const faceDoor = ({ building, door }: Station) =>
  Math.atan2(door[0] - building.position[0], door[1] - building.position[1]);

/** Every station's building on the map, each with its floating, clickable name. */
export function MapBuildings() {
  return (
    <>
      {STATIONS.map((station) => {
        const { id, building, labelKey } = station;
        const [x, z] = building.position;
        const y = building.kind === "dock" ? 0 : terrainHeight(x, z).height;
        const rotationY = faceDoor(station) + (building.kind === "model" ? building.facingOffset ?? 0 : 0);
        const select = () => mapStore.goTo(id);
        const labelHeight = building.kind === "model" ? building.size * 0.85 + 1.2 : 2.6;

        return (
          <group key={id}>
            {building.kind === "model" && (
              <ModelBuilding file={building.file} size={building.size} position={[x, y, z]} rotationY={rotationY} onSelect={select} />
            )}
            {building.kind === "dock" && <Dock position={[x, y, z]} rotationY={rotationY} onSelect={select} />}
            <StationLabel id={id} labelKey={labelKey} position={[x, y + labelHeight, z]} />
          </group>
        );
      })}
    </>
  );
}
