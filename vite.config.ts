import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@data": resolve(__dirname, "src/data"),
      "@images": resolve(__dirname, "src/images"),
      "@styles": resolve(__dirname, "src/styles"),
      "@utils": resolve(__dirname, "src/utils"),
    },
  },
});
