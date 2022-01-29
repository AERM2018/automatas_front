import { automatas } from "../db/automatas";

export const isWordValid = (word, dfa) => {
  const dfaStruct = automatas[dfa - 1];
  let currentState = dfaStruct.initalState;
  let isTransitionApplied;
  try {
    if (word.length < 1) throw Error("Type first a word");
    word.split("").forEach((symbol) => {
      isTransitionApplied = false;
      const possibePath = dfaStruct.transitions.find(
        (transition) =>
          transition.state === currentState && transition.symbol === symbol
      );
      if (possibePath !== undefined) {
        currentState = possibePath.toState;
        isTransitionApplied = true;
      }
    });
    if (dfaStruct.finalStates.includes(currentState) && isTransitionApplied) {
      alert("Correct word");
    } else {
      alert("Invalid word");
    }
  } catch (error) {
    alert(error);
  }
};
