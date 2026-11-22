// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppRouter } from "./AppRouter";

// AppRouter uses BrowserRouter, which reads the real (jsdom) URL.
// So each test sets the URL first, then renders.
const renderAt = (path) => {
  window.history.pushState({}, "", path);
  render(<AppRouter />);
};

describe("AppRouter", () => {
  it("shows the navbar and the home page at /automatas", () => {
    renderAt("/automatas");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Select an option" })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/automatas");
  });

  it.each(["/", "/unknown", "/automatas/extra"])(
    "redirects %s to /automatas",
    (path) => {
      renderAt(path);
      expect(window.location.pathname).toBe("/automatas");
      expect(
        screen.getByRole("heading", { name: "Select an option" })
      ).toBeInTheDocument();
    }
  );
});
