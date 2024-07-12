import {
  Accessor,
  Index,
  Setter,
  Show,
  VoidComponent,
  createEffect,
  createSignal,
} from "solid-js";
import Toggle from "./components/toggle";
import Button from "./components/button";
import { createStore, unwrap } from "solid-js/store";
import Line from "./components/line";
import { usePattern } from "./contexts/PatternContext";

type LinesStore = {
  lines: {
    from: () => HTMLDivElement;
    to: undefined | (() => HTMLDivElement);
  }[];
};

const Settings: VoidComponent<{
  showHitbox: Accessor<boolean>;
  setShowHitbox: Setter<boolean>;
  showPattern: Accessor<boolean>;
  setShowPattern: Setter<boolean>;
  setPinAnswer: Setter<string>;
  setPatternAnswer: Setter<string>;
}> = (props) => {
  return (
    <div class="flex flex-col gap-1">
      <p class="text-2xl font-semibold">Settings</p>
      <span class="flex items-center gap-2">
        <span>show hitbox</span>
        <Toggle
          initial={props.showHitbox()}
          onToggle={() => props.setShowHitbox((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>show pattern</span>
        <Toggle
          initial={props.showPattern()}
          onToggle={() => props.setShowPattern((val) => !val)}
        />
      </span>
      <span class="flex items-center gap-2">
        <span>PIN answer</span>
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="A string of digits"
          type="text"
          pattern="[0-9]{1,50}"
          onInput={(input) =>
            props.setPinAnswer(input.currentTarget.value ?? "")
          }
        />
      </span>
      <span class="flex items-center gap-2">
        <span>pattern answer</span>
        <input
          class="border border-transparent invalid:border-red-500"
          placeholder="The buttons' label separated by commas (spaces are optional)"
          type="text"
          pattern="(?:([0-9]|DEL|OK)\s*,\s*)+([0-9]|DEL|OK)"
          onInput={(input) =>
            props.setPatternAnswer(input.currentTarget.value ?? "")
          }
        />
      </span>
    </div>
  );
};

const LogPanel: VoidComponent<{
  patternInputHistory: number[][];
  pinInput: number[];
}> = (props) => {
  return (
    <div class="flex flex-col gap-1">
      <p class="text-2xl font-semibold">Log panel</p>
      <div>
        <p>pattern history</p>
        <div class="border rounded-sm p-2">
          <Index each={props.patternInputHistory}>
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
          {props.pinInput.map((id) => textContents[id]).join(" ")}
        </div>
      </div>
    </div>
  );
};

const textContents = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "DEL",
  "0",
  "OK",
];

const Main: VoidComponent = () => {
  const [pinAnswer, setPinAnswer] = createSignal("");
  const [patternAnswer, setPatternAnswer] = createSignal("");

  const [showHitbox, setShowHitbox] = createSignal(true);
  const [showPattern, setShowPattern] = createSignal(true);

  const [refs, setRefs] = createStore<HTMLDivElement[]>(
    Array(12).fill(undefined)
  );

  const [pinInput, setPinInput] = createStore<number[]>([]);

  const [patternInput, setPatternInput] = createStore<number[]>([]);
  const [patternInputHistory, setPatternInputHistory] = createStore<number[][]>(
    []
  );

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

  const patternSettings = { thickness: 5, color: "white" };

  const lines: () => LinesStore = () => ({
    lines: patternInput.map((value, index, array) => ({
      from: () => refs[value],
      to: index + 1 === array.length ? undefined : () => refs[array[index + 1]],
    })),
  });

  let grid = (
    <div class="shrink grid grid-cols-3 gap-5 ">
      <Index each={refs}>
        {(_item, index) => (
          <Button
            showHitbox={showHitbox}
            ref={(el) => setRefs([index], el)}
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
  );

  const [state, setState] = usePattern();

  const removeRegistering = () => {
    setState("off");
    if (patternInput.length > 1) {
      setPatternInputHistory((prev) => [...prev, [...patternInput]]);
    }
    window.removeEventListener("pointerup", removeRegistering);
  };

  createEffect(() => {
    console.log(state());
    if (state() === "start") {
      setPatternInput([]);
      window.addEventListener("pointerup", removeRegistering);
    } else if (state() === "registering") {
      window.addEventListener("pointerup", removeRegistering);
    } else {
      console.log(unwrap((() => patternInput)()));
    }
  });

  return (
    <>
      <div class="flex flex-col md:w-1/2 lg:w-1/3 justify-self-center">
        <Settings
          showHitbox={showHitbox}
          setShowHitbox={setShowHitbox}
          showPattern={showPattern}
          setShowPattern={setShowPattern}
          setPatternAnswer={setPatternAnswer}
          setPinAnswer={setPinAnswer}
        />
        <div class="flex justify-center h-10">
          <Index each={pinInput}>{() => <div class="text-4xl">*</div>}</Index>
        </div>
        <div class="flex justify-center m-10">{grid}</div>
        <LogPanel
          patternInputHistory={patternInputHistory}
          pinInput={pinInput}
        />
      </div>

      <div>
        <Show when={lines().lines.length > 0 && showPattern()}>
          <Index each={lines().lines}>
            {(line) => (
              <Line div1={line().from} div2={line().to} {...patternSettings} />
            )}
          </Index>
        </Show>
      </div>
    </>
  );
};

export default Main;
