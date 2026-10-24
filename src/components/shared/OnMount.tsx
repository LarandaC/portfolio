import { useEffect } from "react";

/** Calls `onMount` once it is committed — used to detect a resolved Suspense boundary. */
export function OnMount({ onMount }: { onMount: () => void }) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return null;
}
