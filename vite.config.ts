import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Libraries every visit needs, grouped so they stay cached across deploys
// while the app code changes. Anything not listed is split per lazy import.
// React-based libraries must share React's chunk: split apart, the CommonJS
// interop can run react-i18next before React is initialised (blank page).
const VENDOR_CHUNKS: Record<string, string[]> = {
  react: [
    "react",
    "react-dom",
    "scheduler",
    "react-router",
    "react-router-dom",
    "i18next",
    "react-i18next",
    "i18next-browser-languagedetector",
  ],
  motion: ["gsap", "lenis"],
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const pkg = id.match(/node_modules[\\/]((?:@[^\\/]+[\\/])?[^\\/]+)/)?.[1];
          if (!pkg) return;
          return Object.keys(VENDOR_CHUNKS).find((chunk) => VENDOR_CHUNKS[chunk].includes(pkg));
        },
      },
    },
  },
});
