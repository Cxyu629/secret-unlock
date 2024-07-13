import { VoidComponent, Index } from "solid-js";
import { SetStoreFunction, unwrap } from "solid-js/store";
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
    patternInputStore: [, setPatternInput],
    patternInputHistoryStore: [patternInputHistory],
  } = usePatternContext();

  const {
    pinAnswerSignal: [pinAnswer],
    patternAnswerSignal: [patternAnswer],
    showHitboxSignal: [showHitbox],
  } = useSettingsContext();

  const triggerUnlock = () => {
    if (pinAnswer() === "" && patternAnswer() === "")
      alert("no answew u dummy");
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
      console.log(
        pinAnswer()
          .split("")
          .map((num) => textContents.findIndex((textVal) => textVal === num))
      );
      console.log(unwrap(pinInput));
      console.log(patternAnswer());
      console.log(unwrap(patternInputHistory.at(-1)));
      alert("kono baka!! hentai!! nande omae konnani dame na no???");
    }
  };

  return (
    <div>
      <div class="flex justify-center h-10">
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
              />
            )}
          </Index>
        </div>
      </div>
    </div>
  );
};

export default UnlockInterface;
