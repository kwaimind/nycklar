import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  dts: {
    sourcemap: false,
  },
  minify: true,
  sourcemap: false,
});
