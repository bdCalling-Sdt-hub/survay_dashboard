import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "10.0.60.24",
    port: "3002",
  },
  plugins: [react()],
});
