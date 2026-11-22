let supported: boolean | undefined;

/** Whether the browser can create a WebGL context (checked once). */
export function hasWebGL() {
  if (supported === undefined) {
    try {
      const canvas = document.createElement("canvas");
      supported = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      supported = false;
    }
  }
  return supported;
}
