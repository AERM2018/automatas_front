// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("shows the app title inside a navigation bar", () => {
    render(<Navbar />);
    // Query by role, like a user or screen reader would find it, not by CSS class
    const nav = screen.getByRole("navigation");
    expect(nav).toContainElement(
      screen.getByRole("heading", { name: "Automata exercises" })
    );
  });
});
