import { useState } from "react";
import { Select } from "../components/Select";
import TransitionTable from "../components/TransitionTable";
import { WordTester } from "../components/WordTester";

export const HomePage = () => {
  const [automataSelected, setAutomataSelected] = useState({
    name: "First automata",
    value: 1,
  });

  return (
    <>
      <div className="ms-4">
        <Select
          automataSelected={automataSelected}
          setAutomataSelected={setAutomataSelected}
        />
        {/* Automata info */}
        <TransitionTable automataID={automataSelected.value - 1} />
        <WordTester dfa={automataSelected} />
      </div>
    </>
  );
};
