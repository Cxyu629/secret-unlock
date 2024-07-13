import { VoidComponent, Show, Index } from "solid-js";
import Line from "./components/line";
import { usePatternContext } from "./contexts/PatternContext";
import { useSettingsContext } from "./contexts/SettingsContext";

type LinesStore = {
  lines: {
    from: () => HTMLDivElement;
    to: undefined | (() => HTMLDivElement);
  }[];
};

const PatternTrace: VoidComponent<{ refs: HTMLDivElement[] }> = (props) => {
  const {
    patternInputStore: [patternInput],
  } = usePatternContext();

  const {
    showPatternTraceSignal: [showPattern],
  } = useSettingsContext();

  const patternSettings = { thickness: 5, color: "white" };

  const lines: () => LinesStore = () => ({
    lines: patternInput.map((value, index, array) => ({
      from: () => props.refs[value],
      to:
        index + 1 === array.length
          ? undefined
          : () => props.refs[array[index + 1]],
    })),
  });

  return (
    <Show when={lines().lines.length > 0 && showPattern()}>
      <Index each={lines().lines}>
        {(line) => (
          <Line div1={line().from} div2={line().to} {...patternSettings} />
        )}
      </Index>
    </Show>
  );
};

export default PatternTrace;
