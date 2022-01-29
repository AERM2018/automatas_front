export const automatas = [
  {
    graph: "/assets/imgs/first.png",
    states: ["q0", "{q0,q1}", "{q0,q1,q2}", "{q0,q2}", "{q0,q1,q2,q3}"],
    symbols: ["a", "b"],
    initalState: "q0",
    finalStates: ["{q0,q1,q2,q3}"],
    transitions: [
      {
        state: "q0",
        symbol: "a",
        toState: "q0",
      },
      {
        state: "q0",
        symbol: "b",
        toState: "{q0,q1}",
      },
      {
        state: "{q0,q1}",
        symbol: "a",
        toState: "q0",
      },
      {
        state: "{q0,q1}",
        symbol: "b",
        toState: "{q0,q1,q2}",
      },
      {
        state: "{q0,q1,q2}",
        symbol: "a",
        toState: "{q0,q2}",
      },
      {
        state: "{q0,q1,q2}",
        symbol: "b",
        toState: "{q0,q1,q2,q3}",
      },
      {
        state: "{q0,q2}",
        symbol: "a",
        toState: "{q0,q2}",
      },
      {
        state: "{q0,q2}",
        symbol: "b",
        toState: "{q0,q1,q2,q3}",
      },
      {
        state: "{q0,q1,q2,q3}",
        symbol: "a",
        toState: "{q0,q2}",
      },
      {
        state: "{q0,q1,q2,q3}",
        symbol: "b",
        toState: "{q0,q1,q2,q3}",
      },
    ],
  },
  {
    graph: "/assets/imgs/second.png",
    states: ["q0", "{q1,q2}", "{q0,q1,q2}"],
    symbols: ["0", "1"],
    initalState: "q0",
    finalStates: ["{q1,q2}", "{q0,q1,q2}"],
    transitions: [
      {
        state: "q0",
        symbol: "0",
        toState: "q0",
      },
      {
        state: "q0",
        symbol: "1",
        toState: "{q1,q2}",
      },
      {
        state: "{q1,q2}",
        symbol: "0",
        toState: "{q0,q1,q2}",
      },
      {
        state: "{q1,q2}",
        symbol: "1",
        toState: "{q1,q2}",
      },
      {
        state: "{q0,q1,q2}",
        symbol: "0",
        toState: "{q0,q1,q2}",
      },
      {
        state: "{q0,q1,q2}",
        symbol: "1",
        toState: "{q1,q2}",
      },
    ],
  },
  {
    graph: "/assets/imgs/third.png",
    states: ["q0", "{q1,q2}", "q2"],
    symbols: ["a", "b"],
    initalState: "q0",
    finalStates: ["{q1,q2}", "q2"],
    transitions: [
      {
        state: "q0",
        symbol: "a",
        toState: "{q1,q2}",
      },
      {
        state: "{q1,q2}",
        symbol: "a",
        toState: "{q1,q2}",
      },
      {
        state: "{q1,q2}",
        symbol: "b",
        toState: "q2",
      },
      {
        state: "q2",
        symbol: "a",
        toState: "{q1,q2}",
      },
      {
        state: "q2",
        symbol: "b",
        toState: "q2",
      },
    ],
  },
];
