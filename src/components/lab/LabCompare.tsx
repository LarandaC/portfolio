import { LAB_MODELS } from "./const/labModels";
import { LabModelView } from "./LabModelView";

const SPACING = 1.6;

/** Every cat side by side at the same height, animated if it can be, to choose Amaru at a glance. */
export function LabCompare({ toon }: { toon: boolean }) {
  const cats = LAB_MODELS.filter((model) => model.kind === "cat");
  const offset = ((cats.length - 1) * SPACING) / 2;

  return (
    <>
      {cats.map((cat, i) => (
        <group key={cat.id} position={[i * SPACING - offset, 0, 0]}>
          <LabModelView file={cat.file} toon={toon} targetHeight={1} autoplay />
        </group>
      ))}
    </>
  );
}
