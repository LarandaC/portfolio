import { Fragment } from "react";

/** Renders text as one `.w` span per word so GSAP can stagger them. */
export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="w inline-block will-change-[transform,filter,opacity]">{word}</span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
