// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/kookit-admin/",   // <- CHANGED: important for GitHub Pages subpath
  plugins: [react()],
  build: {
    assetsDir: "assets"
  }
});
