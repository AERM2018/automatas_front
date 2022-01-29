export const Select = (props) => {
  const { automataSelected, setAutomataSelected } = props;
  const handleDropdownClick = (e) => {
    e.preventDefault();
    const { id, textContent } = e.target;
    setAutomataSelected({ name: textContent, value: id });
  };
  const selectOpts = [
    {
      id: 1,
      name: "First automata",
    },
    {
      id: 2,
      name: "Second automata",
    },
    {
      id: 3,
      name: "Thrid automata",
    },
  ];
  return (
    <div className="d-flex mb-5 mt-3">
      <h3 className="me-3">Select an option </h3>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {automataSelected.name}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {selectOpts.map((opt) => (
            <li>
              <div
                id={opt.id}
                className="dropdown-item"
                onClick={handleDropdownClick}
              >
                {opt.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
