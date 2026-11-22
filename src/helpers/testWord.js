import { automatas } from "../db/automatas";

export const isWordValid = (word, dfa) => {
  const dfaStruct = automatas[dfa - 1];
  if (word.length < 1) {
    alert("Type first a word");
    return;
  }
  alert(acceptsWord(word, dfaStruct) ? "Correct word" : "Invalid word");
};

// Runs the DFA over the word. If any symbol has no transition from the
// current state, the word is rejected immediately (the DFA "gets stuck").
export const acceptsWord = (word, dfaStruct) => {
  let currentState = dfaStruct.initalState;
  for (const symbol of word) {
    const transition = dfaStruct.transitions.find(
      (t) => t.state === currentState && t.symbol === symbol
    );
    if (transition === undefined) return false;
    currentState = transition.toState;
  }
  return dfaStruct.finalStates.includes(currentState);
};
