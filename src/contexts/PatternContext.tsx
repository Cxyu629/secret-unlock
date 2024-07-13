import {
  ParentComponent,
  Signal,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { SetStoreFunction, createStore, unwrap } from "solid-js/store";

type PatternState = "off" | "start" | "registering";

type Pattern = {
  stateSignal: Signal<PatternState>;
  patternInputStore: [get: number[], set: SetStoreFunction<number[]>];
  patternInputHistoryStore: [
    get: number[][],
    set: SetStoreFunction<number[][]>
  ];
};

const PatternContext = createContext<Pattern>();

export const PatternProvider: ParentComponent = (props) => {
  const [state, setState] = createSignal<PatternState>("off");

  const [patternInput, setPatternInput] = createStore<number[]>([]);
  const [patternInputHistory, setPatternInputHistory] = createStore<number[][]>(
    []
  );

  const removeRegistering = () => {
    setState("off");
    if (patternInput.length > 1) {
      setPatternInputHistory((prev) => [...prev, [...patternInput]]);
    }
    window.removeEventListener("pointerup", removeRegistering);
  };

  createEffect(() => {
    switch (state()) {
      case "off":
        console.log(unwrap((() => patternInput)()));
        break;
      case "start":
        setPatternInput([]);
        window.addEventListener("pointerup", removeRegistering);
        break;
      case "registering":
        window.addEventListener("pointerup", removeRegistering);
        break;
    }
  });

  const value: Pattern = {
    stateSignal: [state, setState],
    patternInputStore: [patternInput, setPatternInput],
    patternInputHistoryStore: [patternInputHistory, setPatternInputHistory],
  };

  return (
    <PatternContext.Provider value={value}>
      {props.children}
    </PatternContext.Provider>
  );
};

export const usePatternContext = () => {
  const context = useContext(PatternContext);
  if (context === undefined) {
    throw new Error("usePatternContext: cannot find a PatternContext");
  }

  return context;
};
