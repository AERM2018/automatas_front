import { describe, it, expect, vi, beforeEach } from "vitest";
import { acceptsWord, isWordValid } from "./testWord";
import { automatas } from "../db/automatas";

// A tiny hand-made DFA so the core algorithm is tested independently of the app data.
// Accepts words over {a, b} that end in "b". State "dead" exists but has no transitions.
const endsInB = {
  initalState: "s0",
  finalStates: ["s1"],
  transitions: [
    { state: "s0", symbol: "a", toState: "s0" },
    { state: "s0", symbol: "b", toState: "s1" },
    { state: "s1", symbol: "a", toState: "s0" },
    { state: "s1", symbol: "b", toState: "s1" },
  ],
};

describe("acceptsWord", () => {
  it("accepts a word that ends in a final state", () => {
    expect(acceptsWord("ab", endsInB)).toBe(true);
    expect(acceptsWord("b", endsInB)).toBe(true);
  });

  it("rejects a word that ends in a non-final state", () => {
    expect(acceptsWord("ba", endsInB)).toBe(false);
    expect(acceptsWord("a", endsInB)).toBe(false);
  });

  it("rejects as soon as a symbol has no transition, even if later symbols would reach a final state", () => {
    // "c" is not in the alphabet: the DFA gets stuck and the trailing "b" must not rescue it
    expect(acceptsWord("cb", endsInB)).toBe(false);
    expect(acceptsWord("acb", endsInB)).toBe(false);
  });

  it("decides the empty word by whether the initial state is final", () => {
    expect(acceptsWord("", endsInB)).toBe(false);
    expect(acceptsWord("", { ...endsInB, finalStates: ["s0"] })).toBe(true);
  });

  it("is case-sensitive", () => {
    expect(acceptsWord("aB", endsInB)).toBe(false);
  });
});

// Expected results worked out by hand from each automaton's transition table.
describe.each([
  {
    name: "first automata (alphabet a, b)",
    index: 0,
    accepted: ["bbb", "bbbb", "bbbab", "abbb", "bbbaab", "aabbbb"],
    rejected: ["a", "b", "bb", "bba", "bbba", "abbba", "bbbaa", "bbbc", "c"],
  },
  {
    name: "second automata (alphabet 0, 1)",
    index: 1,
    accepted: ["1", "10", "11", "01", "001", "100", "1010"],
    rejected: ["0", "00", "000", "2", "12", "a"],
  },
  {
    name: "third automata (alphabet a, b)",
    index: 2,
    accepted: ["a", "aa", "ab", "abb", "aba", "abab"],
    rejected: ["b", "ba", "bb", "bab", "ac", "c"],
  },
])("$name", ({ index, accepted, rejected }) => {
  it.each(accepted)('accepts "%s"', (word) => {
    expect(acceptsWord(word, automatas[index])).toBe(true);
  });

  it.each(rejected)('rejects "%s"', (word) => {
    expect(acceptsWord(word, automatas[index])).toBe(false);
  });
});

describe("isWordValid", () => {
  let alertSpy;

  beforeEach(() => {
    // alert() only exists in browsers, so provide a fake one we can inspect
    alertSpy = vi.fn();
    vi.stubGlobal("alert", alertSpy); // restored automatically (unstubGlobals in vite.config.js)
  });

  it('shows "Correct word" for an accepted word', () => {
    isWordValid("bbb", 1);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Correct word");
  });

  it('shows "Invalid word" for a rejected word', () => {
    isWordValid("ba", 3);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Invalid word");
  });

  it("asks for a word when the input is empty", () => {
    isWordValid("", 1);
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Type first a word");
  });

  it("uses a 1-based automata number", () => {
    // "1" is accepted only by the second automata
    isWordValid("1", 2);
    expect(alertSpy).toHaveBeenLastCalledWith("Correct word");
    isWordValid("1", 1);
    expect(alertSpy).toHaveBeenLastCalledWith("Invalid word");
  });

  it("accepts the automata number as a string, as the dropdown passes it", () => {
    // Select.jsx reads the id from the DOM, so the value arrives as "3"
    isWordValid("a", "3");
    expect(alertSpy).toHaveBeenCalledExactlyOnceWith("Correct word");
  });
});
