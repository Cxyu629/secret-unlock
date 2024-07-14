import { VoidComponent, Index } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import Button from "./components/button";
import { usePatternContext } from "./contexts/PatternContext";
import { usePinContext } from "./contexts/PinContext";
import { useSettingsContext } from "./contexts/SettingsContext";
import { textContents } from "./assets/textContents";

type UnlockInterfaceProps = {
  refs: HTMLDivElement[];
  setRefs: SetStoreFunction<HTMLDivElement[]>;
};

const UnlockInterface: VoidComponent<UnlockInterfaceProps> = (props) => {
  const {
    pinInputStore: [pinInput, setPinInput],
  } = usePinContext();

  const {
    patternInputStore: [patternInput, setPatternInput],
    patternInputHistoryStore: [patternInputHistory],
  } = usePatternContext();

  const {
    pinAnswerSignal: [pinAnswer],
    patternAnswerSignal: [patternAnswer],
    showHitboxSignal: [showHitbox],
  } = useSettingsContext();

  const triggerUnlock = () => {
    if (pinAnswer() === "" && patternAnswer() === "")
      alert("no answers provided u dummy 💢💢💢");
    else if (
      (pinAnswer() === "" ||
        pinAnswer()
          .split("")
          .map((num) => textContents.findIndex((textVal) => textVal === num))
          .toString() === pinInput.toString()) &&
      (patternAnswer() === "" ||
        patternAnswer()
          .split(",")
          .map((val) => val.trim())
          .map((val) => textContents.findIndex((textVal) => textVal === val))
          .toString() === patternInputHistory.at(-1)?.toString())
    ) {
      alert("you very good good!!! uncle give you lollipop 🍭");
    } else {
      alert(
        "you FAILURE! little jimmy is a cave boy and he can do better than you!!!"
      );
    }
  };

  return (
    <div>
      <div class="flex justify-center h-10 select-none">
        <Index each={pinInput}>{() => <div class="text-4xl">*</div>}</Index>
      </div>
      <div class="flex justify-center m-5 touch-none">
        <div class="shrink grid grid-cols-3 gap-5 ">
          <Index each={props.refs}>
            {(_item, index) => (
              <Button
                showHitbox={showHitbox}
                ref={(el) => props.setRefs([index], el)}
                item={textContents[index]}
                patternAction={() =>
                  setPatternInput((prev) =>
                    prev.includes(index) ? prev : [...prev, index]
                  )
                }
                pinAction={() =>
                  [9, 11].includes(index)
                    ? index === 9
                      ? setPinInput((prev) => prev.slice(0, -1))
                      : triggerUnlock()
                    : setPinInput((prev) => [...prev, index])
                }
                registered={() => patternInput.includes(index)}
              />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
};

export default UnlockInterface;
