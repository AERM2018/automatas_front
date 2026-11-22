// @vitest-environment jsdom
// index.jsx has no exports: importing it *is* running it. So the test prepares the
// page index.html would provide (an empty #root), imports the file, and checks the app appeared.
import { it, expect } from "vitest";
import { act, screen } from "@testing-library/react";

it("mounts the app into #root", async () => {
  document.body.innerHTML = '<div id="root"></div>';
  window.history.pushState({}, "", "/");

  await act(async () => {
    await import("./index.jsx");
  });

  const root = document.getElementById("root");
  expect(root).toContainElement(screen.getByRole("navigation"));
  expect(
    screen.getByRole("heading", { name: "Select an option" })
  ).toBeInTheDocument();
  expect(window.location.pathname).toBe("/automatas");
});
