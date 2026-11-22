import { SIGNPOSTS } from "./const/worldLayout";
import { Signpost } from "./Signpost";

/** One signpost at the start of every path, naming where it leads. */
export function Signposts() {
  return (
    <>
      {SIGNPOSTS.map((sign) => (
        <Signpost key={sign.stationId} {...sign} />
      ))}
    </>
  );
}
