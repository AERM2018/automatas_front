import { describe, it, expect } from "vitest";
import { automatas } from "./automatas";

// The app's correctness depends on this data describing valid DFAs,
// so these tests check the definition of a DFA rather than specific values.

it("defines the three automata the dropdown offers", () => {
  expect(automatas).toHaveLength(3);
});

describe.each(automatas.map((automata, i) => [i + 1, automata]))(
  "automata %i",
  (_number, automata) => {
    const { states, symbols, initalState, finalStates, transitions, graph } =
      automata;

    it("has unique states and symbols", () => {
      expect(new Set(states).size).toBe(states.length);
      expect(new Set(symbols).size).toBe(symbols.length);
    });

    it("uses single-character symbols (words are split into characters)", () => {
      for (const symbol of symbols) expect(symbol).toHaveLength(1);
    });

    it("has an initial state that is one of its states", () => {
      expect(states).toContain(initalState);
    });

    it("has at least one final state, all of them among its states", () => {
      expect(finalStates.length).toBeGreaterThan(0);
      for (const state of finalStates) expect(states).toContain(state);
    });

    it("only has transitions between its own states, on its own symbols", () => {
      for (const t of transitions) {
        expect(states).toContain(t.state);
        expect(states).toContain(t.toState);
        expect(symbols).toContain(t.symbol);
      }
    });

    it("is deterministic: at most one transition per state and symbol", () => {
      const pairs = transitions.map((t) => `${t.state}|${t.symbol}`);
      expect(new Set(pairs).size).toBe(pairs.length);
    });

    it("has every state reachable from the initial state", () => {
      const reached = new Set([initalState]);
      const pending = [initalState];
      while (pending.length > 0) {
        const current = pending.pop();
        for (const t of transitions) {
          if (t.state === current && !reached.has(t.toState)) {
            reached.add(t.toState);
            pending.push(t.toState);
          }
        }
      }
      expect([...reached].sort()).toEqual([...states].sort());
    });

    it("points to a graph image in public/assets/imgs", () => {
      expect(graph).toMatch(/^\/assets\/imgs\/[\w-]+\.png$/);
    });
  }
);
