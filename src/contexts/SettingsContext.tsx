import {
  ParentComponent,
  Signal,
  createContext,
  createSignal,
  useContext,
} from "solid-js";

type Settings = {
  pinAnswerSignal: Signal<string>;
  patternAnswerSignal: Signal<string>;
  showHitboxSignal: Signal<boolean>;
  showPatternSignal: Signal<boolean>;
};

const SettingsContext = createContext<Settings>();

export const SettingsProvider: ParentComponent = (props) => {
  const [pinAnswer, setPinAnswer] = createSignal("");
  const [patternAnswer, setPatternAnswer] = createSignal("");

  const [showHitbox, setShowHitbox] = createSignal(true);
  const [showPattern, setShowPattern] = createSignal(true);

  const value: Settings = {
    pinAnswerSignal: [pinAnswer, setPinAnswer],
    patternAnswerSignal: [patternAnswer, setPatternAnswer],
    showHitboxSignal: [showHitbox, setShowHitbox],
    showPatternSignal: [showPattern, setShowPattern],
  };

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettingsContext: cannot find a SettingsContext");
  }

  return context;
};
