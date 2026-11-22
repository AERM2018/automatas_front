// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

// Select doesn't own its state: the parent passes the current value and a setter.
// So we pass a fake setter (vi.fn()) and check how Select calls it.
const renderSelect = (selected = { name: "First automata", value: 1 }) => {
  const setAutomataSelected = vi.fn();
  render(
    <Select
      automataSelected={selected}
      setAutomataSelected={setAutomataSelected}
    />
  );
  return { setAutomataSelected };
};

// The selected name is shown on the button too, so look for options inside the menu list only
const option = (name) => within(screen.getByRole("list")).getByText(name);

describe("Select", () => {
  it("shows the prompt", () => {
    renderSelect();
    expect(
      screen.getByRole("heading", { name: "Select an option" })
    ).toBeInTheDocument();
  });

  it("shows the selected automata's name on the dropdown button", () => {
    renderSelect({ name: "Second automata", value: 2 });
    expect(screen.getByRole("button")).toHaveTextContent("Second automata");
  });

  it("lists the three automata as options", () => {
    renderSelect();
    const options = screen.getAllByRole("listitem");
    expect(options.map((li) => li.textContent)).toEqual([
      "First automata",
      "Second automata",
      "Third automata",
    ]);
  });

  it.each([
    ["First automata", "1"],
    ["Second automata", "2"],
    ["Third automata", "3"],
  ])('selecting "%s" reports its name and id %s', async (name, id) => {
    const user = userEvent.setup();
    const { setAutomataSelected } = renderSelect();

    await user.click(option(name));

    // The id is read from the DOM, so it arrives as a string
    expect(setAutomataSelected).toHaveBeenCalledExactlyOnceWith({
      name,
      value: id,
    });
  });

  it("prevents the default click action of the option", () => {
    renderSelect();
    // fireEvent returns false when the handler called event.preventDefault()
    expect(fireEvent.click(option("Second automata"))).toBe(false);
  });

  it("does not call the setter until an option is clicked", async () => {
    const user = userEvent.setup();
    const { setAutomataSelected } = renderSelect();
    await user.click(screen.getByRole("button")); // just opening the dropdown
    expect(setAutomataSelected).not.toHaveBeenCalled();
  });
});
