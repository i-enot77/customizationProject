import path from "path";
// import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    testTimeout: 15000,
  },

  // optimizeDeps: {
  //   exclude: ["@react-three/drei", "three"],
  // },
});
