import clsx from "clsx";
import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import { usePattern } from "../contexts/PatternContext";

type ButtonProps = {
  showHitbox: Accessor<boolean>;
  ref: (el: HTMLDivElement) => void;
  item: string;
  patternAction: () => void;
  pinAction: () => void;
};

export default function Button(props: ButtonProps) {
  const [myRef, setMyRef] = createSignal<HTMLDivElement>();

  const [state, setState] = usePattern();

  onMount(() => {
    myRef()!.addEventListener("mousedown", () => {
      setState("start");
      props.patternAction();
    });

    myRef()!.addEventListener("mouseleave", () => {
      if (state() === "start") {
        setState("registering");
      }
    });
  });

  createEffect(() => {
    if (state() === "registering") {
      myRef()!.addEventListener("mouseover", props.patternAction);
    } else {
      myRef()!.removeEventListener("mouseover", props.patternAction);
    }
  });

  return (
    <div
      class="grid border size-16 rounded-full place-content-center hover:backdrop-brightness-125 active:backdrop-brightness-75"
      onClick={props.pinAction}
    >
      <div
        ref={(el) => {
          props.ref(el);
          setMyRef(el);
        }}
        class={clsx(
          props.showHitbox() && "border",
          "grid border-opacity-50 border-white rounded-full size-12 text-center content-center select-none	"
        )}
      >
        {props.item}
      </div>
    </div>
  );
}
