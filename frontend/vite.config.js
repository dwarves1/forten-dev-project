import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Spring Boot의 static 폴더로 직접 빌드
    outDir: "../src/main/resources/static",
    emptyOutDir: true, // 기존 파일 자동 삭제
  },
});
