// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransitionTable from "./TransitionTable";
import { automatas } from "../db/automatas";

// Reads the rendered table back into plain arrays of text, row by row
// (both header cells <th> and data cells <td>, in order)
const readTable = () =>
  screen
    .getAllByRole("row")
    .map((row) =>
      [...row.querySelectorAll("th, td")].map((cell) => cell.textContent)
    );

describe("TransitionTable", () => {
  it("shows the title", () => {
    render(<TransitionTable automataID={0} />);
    expect(
      screen.getByRole("heading", { name: "Transition table" })
    ).toBeInTheDocument();
  });

  it("renders the third automata's table exactly, with '-' where there is no transition", () => {
    render(<TransitionTable automataID={2} />);
    expect(readTable()).toEqual([
      ["", "a", "b"],
      ["q0", "{q1,q2}", "-"],
      ["{q1,q2}", "{q1,q2}", "q2"],
      ["q2", "{q1,q2}", "q2"],
    ]);
  });

  // For every automata, build the expected table from the data and compare
  it.each(automatas.map((automata, i) => [i, automata]))(
    "renders one row per state and one column per symbol for automata index %i",
    (index, automata) => {
      render(<TransitionTable automataID={index} />);
      const expected = [
        ["", ...automata.symbols],
        ...automata.states.map((state) => [
          state,
          ...automata.symbols.map(
            (symbol) =>
              automata.transitions.find(
                (t) => t.state === state && t.symbol === symbol
              )?.toState ?? "-"
          ),
        ]),
      ];
      expect(readTable()).toEqual(expected);
    }
  );

  it.each(automatas.map((automata, i) => [i, automata.graph]))(
    "shows the graph image for automata index %i",
    (index, graph) => {
      render(<TransitionTable automataID={index} />);
      expect(screen.getByRole("img", { name: "automata" })).toHaveAttribute(
        "src",
        graph
      );
    }
  );
});
