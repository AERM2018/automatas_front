// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WordTester } from "./WordTester";

describe("WordTester", () => {
  let alertSpy;
  beforeEach(() => {
    alertSpy = vi.fn();
    vi.stubGlobal("alert", alertSpy);
  });

  // userEvent types character by character and clicks like a real user,
  // which goes through useForm's onChange handler just like in the browser.
  const typeAndVerify = async (word, dfaValue = 1) => {
    const user = userEvent.setup();
    render(<WordTester dfa={{ name: "any", value: dfaValue }} />);
    if (word) await user.type(screen.getByPlaceholderText("Type a word"), word);
    await user.click(screen.getByRole("button", { name: "Verify" }));
  };

  it("shows a text input and a Verify button", () => {
    render(<WordTester dfa={{ name: "First automata", value: 1 }} />);
    expect(screen.getByRole("heading", { name: "Test a word" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("name", "word");
    expect(screen.getByRole("button", { name: "Verify" })).toBeInTheDocument();
  });

  it("keeps what the user types in the input", async () => {
    const user = userEvent.setup();
    render(<WordTester dfa={{ name: "First automata", value: 1 }} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "abba");
    expect(input).toHaveValue("abba");
  });

  it("reports an accepted word", async () => {
    await typeAndVerify("bbb", 1);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Correct word");
  });

  it("reports a rejected word", async () => {
    await typeAndVerify("ab", 1);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Invalid word");
  });

  it("asks for a word when Verify is clicked with an empty input", async () => {
    await typeAndVerify("", 1);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Type first a word");
  });

  it("checks the word against the automata it receives", async () => {
    // "a" is accepted by the third automata but rejected by the first
    await typeAndVerify("a", 3);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Correct word");
  });

  it("does nothing until Verify is clicked", async () => {
    const user = userEvent.setup();
    render(<WordTester dfa={{ name: "First automata", value: 1 }} />);
    await user.type(screen.getByRole("textbox"), "bbb");
    expect(alertSpy).not.toHaveBeenCalled();
  });
});
