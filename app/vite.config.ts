import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: {
      // buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6", // add buffer
      events: "rollup-plugin-node-polyfills/polyfills/events",
      // stream: "rollup-plugin-node-polyfills/polyfills/stream",
      // util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
  optimizeDeps: {
    exclude: ["@tableland/sqlparser"],
  },
  build: {
    target: "es2020",
    sourcemap: true,
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    fs: {
      allow: ["/"],
    },
  },
  define: {
    "process.env": {},
  },
});
