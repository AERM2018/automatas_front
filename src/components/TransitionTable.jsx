import { automatas } from "../db/automatas";
const TransitionTable = (props) => {
  const { automataID } = props;
  const automata = automatas[automataID];
  return (
    <>
      <h2>Transition table</h2>
      <div className="d-flex">
        <div className="me-3 flex-fill">
          <table className="table table-striped">
            <thead>
              <tr>
                <th></th>
                {automata.symbols.map((el) => (
                  <th key={el}>{`${el}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {automata.states.map((state) => {
                return (
                  <tr key={state}>
                    <th>{`${state}`}</th>
                    {automata.symbols.map((sigma) => {
                      const stateTransitions = automata.transitions.find(
                        (t) => t.state === state && t.symbol === sigma
                      );
                      return (
                        <td key={sigma}>{`${
                          stateTransitions !== undefined
                            ? `${stateTransitions.toState}`
                            : "-"
                        }`}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex-fill">
          <img src={`${automata.graph}`} alt="automata" />
        </div>
      </div>
    </>
  );
};
export default TransitionTable;
