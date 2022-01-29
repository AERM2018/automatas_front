import React from "react";
const TransitionTable = (props) => {
  const { transitions = [], states = [], sigma = [] } = props;
  console.log("states", states);
  console.log("transitions", transitions);
  //  console.log(
  //  states.map((s) => console.log(transtions.filter((t) => t.state === s)))
  //);
  return (
    <>
      <h2>Transition table</h2>
      <table>
        <tr>
          <th></th>
          {sigma.map((el) => (
            <th>{`${el}`}</th>
          ))}
        </tr>
        {states.map((state) => {
          return (
            <tr>
              <th>{`q${state}`}</th>
              {sigma.map((sigma) => {
                const stateTransitions = transitions.find(
                  (t) => t.state === state && t.symbol === sigma
                );
                return (
                  <th>{`${
                    stateTransitions !== undefined
                      ? `q${stateTransitions.toState}`
                      : "-"
                  }`}</th>
                );
              })}
            </tr>
          );
        })}
      </table>
    </>
  );
};
export default TransitionTable;
