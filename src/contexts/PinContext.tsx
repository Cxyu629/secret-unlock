import { ParentComponent, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";

type Pin = {
  pinInputStore: [get: number[], set: SetStoreFunction<number[]>];
};

const PinContext = createContext<Pin>();

export const PinProvider: ParentComponent = (props) => {
  const [pinInput, setPinInput] = createStore<number[]>([]);

  const value: Pin = {
    pinInputStore: [pinInput, setPinInput],
  };

  return (
    <PinContext.Provider value={value}>{props.children}</PinContext.Provider>
  );
};

export const usePinContext = () => {
  const context = useContext(PinContext);
  if (context === undefined) {
    throw new Error("usePinContext: cannot find a PinContext");
  }

  return context;
};
