import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ruta donde buscara server de socket.io
      "/socket.io": {
        // direccion de backend
        target: "http://localhost:3001",
        // web socket
        ws: true,
      },
    },
  },
});
