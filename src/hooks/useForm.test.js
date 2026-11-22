// @vitest-environment jsdom
// Hooks need React to render, and React needs a DOM, so this file runs in jsdom (a simulated browser).
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "./useForm";

// Builds the minimal event object handleInputChange reads
const changeEvent = (name, value) => ({ target: { name, value } });

describe("useForm", () => {
  it("starts with the initial values", () => {
    const { result } = renderHook(() => useForm({ word: "abc" }));
    const [values] = result.current;
    expect(values).toEqual({ word: "abc" });
  });

  it("defaults to an empty object when no initial values are given", () => {
    const { result } = renderHook(() => useForm());
    expect(result.current[0]).toEqual({});
  });

  it("updates the field named by the input", () => {
    const { result } = renderHook(() => useForm({ word: "" }));
    act(() => result.current[1](changeEvent("word", "ab")));
    expect(result.current[0]).toEqual({ word: "ab" });
  });

  it("keeps other fields when one changes", () => {
    const { result } = renderHook(() => useForm({ word: "", other: "keep" }));
    act(() => result.current[1](changeEvent("word", "ab")));
    expect(result.current[0]).toEqual({ word: "ab", other: "keep" });
  });

  it("applies consecutive changes on top of each other", () => {
    const { result } = renderHook(() => useForm({ first: "", second: "" }));
    act(() => result.current[1](changeEvent("first", "1")));
    act(() => result.current[1](changeEvent("second", "2")));
    expect(result.current[0]).toEqual({ first: "1", second: "2" });
  });

  it("adds a field that was not in the initial values", () => {
    const { result } = renderHook(() => useForm({}));
    act(() => result.current[1](changeEvent("word", "a")));
    expect(result.current[0]).toEqual({ word: "a" });
  });

  it("does not mutate the initial values object", () => {
    const initial = { word: "" };
    const { result } = renderHook(() => useForm(initial));
    act(() => result.current[1](changeEvent("word", "ab")));
    expect(initial).toEqual({ word: "" });
  });

  it("reset() restores the initial values", () => {
    const { result } = renderHook(() => useForm({ word: "" }));
    act(() => result.current[1](changeEvent("word", "ab")));
    act(() => result.current[2]());
    expect(result.current[0]).toEqual({ word: "" });
  });
});
