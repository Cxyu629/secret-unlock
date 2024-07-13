import { VoidComponent } from "solid-js";
import Toggle from "./components/toggle";
import { useSettingsContext } from "./contexts/SettingsContext";
import { usePinContext } from "./contexts/PinContext";
import { usePatternContext } from "./contexts/PatternContext";

const SettingsPanel: VoidComponent = () => {
  const {
    pinAnswerSignal: [, setPinAnswer],
    patternAnswerSignal: [, setPatternAnswer],
    showHitboxSignal: [showHitbox, setShowHitbox],
    showPatternSignal: [showPattern, setShowPattern],
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
        <Toggle
          initial={showHitbox()}
          onToggle={() => setShowHitbox((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>show pattern</span>
        <Toggle
          initial={showPattern()}
          onToggle={() => setShowPattern((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>PIN answer</span>
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="135790"
          type="text"
          pattern="[0-9]{1,50}"
          onInput={(input) => setPinAnswer(input.currentTarget.value ?? "")}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>pattern answer</span>
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="3,1,OK,DEL,9"
          type="text"
          pattern="(?:([0-9]|DEL|OK)\s*,\s*)+([0-9]|DEL|OK)"
          onInput={(input) => setPatternAnswer(input.currentTarget.value ?? "")}
        />
      </span>
      <span class="flex items-center gap-2">
        <input
          class="border px-1 rounded-md hover:backdrop-brightness-125 active:backdrop-brightness-75"
          type="button"
          value="clear"
          onClick={() => {
            setPinInput([]);
            setPatternInputHistory([]);
          }}
        ></input>
      </span>
    </div>
  );
};

export default SettingsPanel;
