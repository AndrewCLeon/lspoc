import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { copyFileSync, mkdirSync, readdirSync } from "fs";

function copyAssets(srcDir: string, destDir: string) {
  mkdirSync(destDir, { recursive: true });
  const files = readdirSync(srcDir);
  for (const file of files) {
    const srcFile = resolve(srcDir, file);
    const destFile = resolve(destDir, file);
    copyFileSync(srcFile, destFile);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // Must match host path name / directory
  base: "/lspoc/",
  plugins: [
    react(),
    {
      name: "copy-assets",
      closeBundle() {
        const srcDir = resolve(__dirname, "src/assets");
        const destDir = resolve(__dirname, "dist/assets");
        copyAssets(srcDir, destDir);
      },
    },
  ],
});
