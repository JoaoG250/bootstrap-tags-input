import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: "bootstrap-tags-input",
      fileName: (format) => `bootstrap-tags-input.${format}.js`,
    },
  },
});
