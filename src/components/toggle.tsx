import clsx from "clsx";
import { createSignal } from "solid-js";

type ToggleProps = {
  onToggle: () => void;
  initial?: boolean;
};

export default function Toggle(props: ToggleProps) {
  let [on, setOn] = createSignal(props.initial ?? false);
  return (
    <div
      class={clsx("w-7 h-4 border rounded-full p-[1px]")}
      onClick={() => {
        props.onToggle();
        setOn((val) => !val);
      }}
    >
      <div
        class={clsx(
          "transition-transform size-3 bg-current rounded-full",
          on() && "translate-x-full"
        )}
      ></div>
    </div>
  );
}
