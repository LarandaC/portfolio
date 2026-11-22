let supported: boolean | undefined;

/** Whether the browser can create a WebGL context (checked once). */
export function hasWebGL() {
  if (supported === undefined) {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      supported = !!gl;
      // Release the probe right away: browsers cap live WebGL contexts, and the real canvases need them.
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      supported = false;
    }
  }
  return supported;
}
