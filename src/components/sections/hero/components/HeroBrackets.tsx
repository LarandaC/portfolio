import type { RefObject } from "react";
import { Bracket } from "./Bracket";

interface HeroBracketsProps {
  leftRef:  RefObject<HTMLDivElement>;
  rightRef: RefObject<HTMLDivElement>;
}

export function HeroBrackets({ leftRef, rightRef }: HeroBracketsProps) {
  return (
    <>
      <Bracket side="left"  divRef={leftRef} />
      <Bracket side="right" divRef={rightRef} />
    </>
  );
}
  