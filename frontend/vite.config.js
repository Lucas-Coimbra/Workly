import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(), // ⚠️ precisa vir antes do React
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // simples e compatível com Vite 5
    },
  },
});
