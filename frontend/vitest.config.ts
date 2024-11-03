import { defineConfig, mergeConfig } from "vitest/config";

import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    root: "./src",
    test: {
      environment: "happy-dom",
      setupFiles: ["./setup-vitest.ts"],
    },
  })
);
