// @vitest-environment jsdom
// Integration test: the real Select, TransitionTable and WordTester working together
// through HomePage's state. Nothing is mocked except the browser's alert().
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "./HomePage";

describe("HomePage", () => {
  let alertSpy;
  let user;
  beforeEach(() => {
    alertSpy = vi.fn();
    vi.stubGlobal("alert", alertSpy);
    user = userEvent.setup();
    render(<HomePage />);
  });

  const dropdownButton = () => screen.getByRole("button", { name: /automata/ });
  const graph = () => screen.getByRole("img", { name: "automata" });
  // Pick an option from the dropdown menu (its name may also be on the button)
  const choose = (name) => user.click(within(screen.getByRole("list")).getByText(name));
  // Column labels of the transition table: the first row group is <thead>
  const symbolsHeader = () =>
    within(screen.getAllByRole("rowgroup")[0])
      .getAllByRole("columnheader")
      .map((th) => th.textContent);
  const verify = async (word) => {
    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, word);
    await user.click(screen.getByRole("button", { name: "Verify" }));
  };

  it("starts with the first automata selected", () => {
    expect(dropdownButton()).toHaveTextContent("First automata");
    expect(graph()).toHaveAttribute("src", "/assets/imgs/first.png");
    // first automata's alphabet is a, b
    expect(symbolsHeader()).toEqual(["", "a", "b"]);
  });

  it("tests words against the first automata by default", async () => {
    await verify("bbb");
    expect(alertSpy).toHaveBeenLastCalledWith("Correct word");
  });

  it("switching automata updates the button, the table and the graph", async () => {
    await choose("Second automata");

    expect(dropdownButton()).toHaveTextContent("Second automata");
    expect(graph()).toHaveAttribute("src", "/assets/imgs/second.png");
    expect(symbolsHeader()).toEqual(["", "0", "1"]);
  });

  it("tests words against the newly selected automata", async () => {
    // "a" is rejected by the first automata...
    await verify("a");
    expect(alertSpy).toHaveBeenLastCalledWith("Invalid word");

    // ...and accepted by the third
    await choose("Third automata");
    await verify("a");
    expect(alertSpy).toHaveBeenLastCalledWith("Correct word");
  });

  it("can switch back to an earlier automata", async () => {
    await choose("Third automata");
    await choose("First automata");
    expect(dropdownButton()).toHaveTextContent("First automata");
    expect(graph()).toHaveAttribute("src", "/assets/imgs/first.png");
  });
});
