import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./") } },
  server: { port: 4321, strictPort: true },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        pricing: path.resolve(__dirname, "pricing.html"),
        gallery: path.resolve(__dirname, "gallery.html"),
      },
    },
  },
})
