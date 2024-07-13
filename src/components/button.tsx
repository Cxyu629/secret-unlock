import clsx from "clsx";
import { Accessor, createEffect, createSignal, onMount } from "solid-js";
import { usePatternContext } from "../contexts/PatternContext";

type ButtonProps = {
  showHitbox: Accessor<boolean>;
  ref: (el: HTMLDivElement) => void;
  item: string;
  patternAction: () => void;
  pinAction: () => void;
  registered: () => boolean;
};

export default function Button(props: ButtonProps) {
  const [myRef, setMyRef] = createSignal<HTMLDivElement>();
  const [animatePattern, setAnimatePattern] = createSignal<boolean>(false);
  const [animatePin, setAnimatePin] = createSignal<boolean>(false);

  const {
    stateSignal: [state, setState],
  } = usePatternContext();

  const registerSelf = () => {
    if (!props.registered()) {
      setAnimatePattern(true);
      setTimeout(() => setAnimatePattern(false), 500);
      props.patternAction();
    }
  };

  onMount(() => {
    myRef()!.addEventListener("pointerdown", function (e) {
      this.releasePointerCapture(e.pointerId);
    });

    myRef()!.addEventListener("pointerdown", () => {
      setState("start");
    });

    myRef()!.addEventListener("pointerleave", () => {
      if (state() === "start") {
        setState("registering");
        registerSelf();
      }
    });
  });

  createEffect(() => {
    if (state() === "registering") {
      myRef()!.addEventListener("pointerover", registerSelf);
    } else {
      myRef()!.removeEventListener("pointerover", registerSelf);
    }
  });

  return (
    <div
      class={clsx(
        "before:absolute before:size-16 before:border before:rounded-full",
        (animatePin() && "before:visible before:animate-single-ping ") ||
          "before:invisible",
        "grid border size-16 rounded-full place-content-center hover:backdrop-brightness-125 active:backdrop-brightness-75"
      )}
      onClick={() => {
        props.pinAction();
        setAnimatePin(true);
        setTimeout(() => setAnimatePin(false), 460);
      }}
    >
      <div
        ref={(el) => {
          props.ref(el);
          setMyRef(el);
        }}
        class={clsx(
          props.showHitbox() && "border",
          animatePattern() && "animate-blink",
          "grid border-opacity-50 border-white rounded-full size-12 text-center content-center select-none	"
        )}
      >
        {props.item}
      </div>
    </div>
  );
}
