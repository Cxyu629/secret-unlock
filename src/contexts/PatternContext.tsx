import {
  Accessor,
  ParentComponent,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type PatternType = "off" | "start" | "registering";

const PatternContext = createContext<
  [Accessor<PatternType>, Setter<PatternType>]
>(createSignal<PatternType>("off"));

export const PatternProvider: ParentComponent = (props) => {
  const [state, setState] = createSignal<PatternType>("off");

  return (
    <PatternContext.Provider value={[state, setState]}>
      {props.children}
    </PatternContext.Provider>
  );
};

export const usePattern = () => useContext(PatternContext);
