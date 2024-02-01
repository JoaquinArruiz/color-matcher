import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://joaquinarruiz.github.io/color-matcher",
  server: {
    watch: {
      usePolling: true,
    },
  },
});
