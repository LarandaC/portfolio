import { CLOUD_A, CLOUD_B } from "@/lib/media";
import { DriftCloud } from "@/components/shared/DriftCloud";
import { CLOUD_LEFT, CLOUD_RIGHT } from "@/components/shared/cloudPositions";

/** Pastel clouds framing the headline; `parallax` drives their scroll speed. */
export function HeroClouds() {
  return (
    <>
      <DriftCloud src={CLOUD_A} className={`cloud-l ${CLOUD_LEFT}`} parallax={-60} />
      <DriftCloud src={CLOUD_B} className={`cloud-r ${CLOUD_RIGHT}`} drift="b" parallax={-90} />
    </>
  );
}
