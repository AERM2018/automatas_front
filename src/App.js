import TransitionTable from "./components/TransitionTable.js";
function App() {
  const aut = {
    states: [1, 2, 3],
    symbols: ["0", "1"],
    initalState: 1,
    finalState: 3,
    transitions: [
      {
        state: 1,
        symbol: "0",
        toState: 2,
      },
      {
        state: 2,
        symbol: "0",
        toState: 2,
      },
      {
        state: 2,
        symbol: "1",
        toState: 3,
      },
    ],
  };
  return (
    <div className="App">
      <h1>Automatas Exercises</h1>
      <TransitionTable
        transitions={aut.transitions}
        sigma={aut.symbols}
        states={aut.states}
      />
      <div>
        <h2>Test a word</h2>
        <label> word </label>
        <input type="text" id="txtWord" />
        <button id="btnVerify">Verify</button>
      </div>

      <div>
        <img src="./imgs/automata.png" alt="automata" />
      </div>
    </div>
  );
}

export default App;
