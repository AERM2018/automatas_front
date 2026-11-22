// Runs before every test file (configured in vite.config.js -> test.setupFiles).
import "@testing-library/jest-dom/vitest"; // adds DOM matchers: toBeInTheDocument(), toHaveAttribute(), ...
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount whatever a test rendered so the next test starts with an empty page.
afterEach(() => cleanup());
