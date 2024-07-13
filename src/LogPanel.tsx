import { VoidComponent, Index } from "solid-js";
import { usePatternContext } from "./contexts/PatternContext";
import { usePinContext } from "./contexts/PinContext";
import { textContents } from "./assets/textContents";

const LogPanel: VoidComponent = () => {
  const {
    pinInputStore: [pinInput],
  } = usePinContext();

  const {
    patternInputHistoryStore: [patternInputHistory],
  } = usePatternContext();

  return (
    <div class="flex flex-col gap-1 min-w-64">
      <p class="text-2xl font-semibold text-center pb-3">Log panel</p>
      <div>
        <p>pattern history</p>
        <div class="border rounded-sm p-2">
          <Index each={patternInputHistory}>
            {(item, index) => (
              <p>
                {index + 1}:{" "}
                {item()
                  .map((id) => textContents[id])
                  .join(", ")}
              </p>
            )}
          </Index>
        </div>
      </div>
      <div>
        <p>PIN</p>
        <div class="border rounded-sm p-2">
          {pinInput.map((id) => textContents[id]).join(" ")}
        </div>
      </div>
    </div>
  );
};

export default LogPanel;
