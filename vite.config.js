import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // same port CRA used, so nothing changes for you
  },
  // https://vitest.dev/config/
  test: {
    environment: "node", // pure logic runs in plain Node; files that need a DOM opt in to jsdom
    setupFiles: ["./vitest.setup.js"],
    restoreMocks: true, // undo vi.spyOn() mocks after every test
    unstubGlobals: true, // undo vi.stubGlobal() (e.g. our fake alert) after every test
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx}"], // business logic and React components
      thresholds: { 100: true }, // fail if any line/branch/function is untested
    },
  },
});
