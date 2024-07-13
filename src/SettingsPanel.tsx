import { VoidComponent } from "solid-js";
import Toggle from "./components/toggle";
import { useSettingsContext } from "./contexts/SettingsContext";
import { usePinContext } from "./contexts/PinContext";
import { usePatternContext } from "./contexts/PatternContext";
import Info from "./components/info";

const SettingsPanel: VoidComponent = () => {
  const {
    pinAnswerSignal: [, setPinAnswer],
    patternAnswerSignal: [, setPatternAnswer],
    showHitboxSignal: [showHitbox, setShowHitbox],
    showPatternTraceSignal: [showPatternTrace, setShowPatternTrace],
  } = useSettingsContext();

  const {
    pinInputStore: [, setPinInput],
  } = usePinContext();

  const {
    patternInputHistoryStore: [, setPatternInputHistory],
  } = usePatternContext();

  return (
    <div class="flex flex-col gap-1">
      <p class="text-2xl font-semibold text-center pb-3">Settings</p>
      <span class="flex items-center gap-2">
        <span>show hitbox</span>
        <Info tooltip="Toggles the visibility of hitbox for pattern drawing (the inner circle)" />
        <Toggle
          initial={showHitbox()}
          onToggle={() => setShowHitbox((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>show pattern trace</span>
        <Info tooltip="Toggles the white lines that traces the patterns you draw" />
        <Toggle
          initial={showPatternTrace()}
          onToggle={() => setShowPatternTrace((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>PIN answer</span>
        <Info tooltip="The PIN answer; will always unlock if left blank" />
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="e.g.: 135790"
          value="123456"
          type="text"
          pattern="[0-9]{1,50}"
          onInput={(input) => setPinAnswer(input.currentTarget.value ?? "")}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>pattern answer</span>
        <Info tooltip="The pattern answer; will always unlock if left blank" />
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="e.g.: 3,1,OK,DEL,9"
          value="1,2,3,5,7,DEL"
          type="text"
          pattern="(?:([0-9]|DEL|OK)\s*,\s*)+([0-9]|DEL|OK)"
          onInput={(input) => setPatternAnswer(input.currentTarget.value ?? "")}
        />
      </span>
      <span class="flex items-center gap-2">
        <input
          class="border px-3 my-1 rounded-md hover:backdrop-brightness-125 active:backdrop-brightness-75"
          type="button"
          value="clear"
          onClick={() => {
            setPinInput([]);
            setPatternInputHistory([]);
          }}
        />
        <Info tooltip="Clears your input history" />
      </span>
    </div>
  );
};

export default SettingsPanel;
