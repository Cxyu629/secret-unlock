import { Accessor, createEffect, onMount } from "solid-js";
import { getOffset } from "../utils";
import { usePatternContext } from "../contexts/PatternContext";

type LineProps = {
  div1: Accessor<HTMLDivElement>;
  div2?: Accessor<HTMLDivElement>;
  color: string;
  thickness: number;
};

export default function Line(props: LineProps) {
  let ref!: HTMLDivElement;

  const setStyle = (e: MouseEvent) => {
    const off1 = getOffset(props.div1());

    const x1 = off1.left + off1.width / 2;
    const y1 = off1.top + off1.height / 2;

    const curX2 = e.pageX;
    const curY2 = e.pageY;

    let x2!: number;
    let y2!: number;
    if (props.div2 !== undefined) {
      const off2 = getOffset(props.div2());

      const divX2 = off2.left + off2.width / 2;
      const divY2 = off2.top + off2.height / 2;

      x2 = divX2;
      y2 = divY2;
    } else {
      x2 = curX2;
      y2 = curY2;
    }

    const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

    const cx = (x1 + x2) / 2 - length / 2;
    const cy = (y1 + y2) / 2 - props.thickness / 2;

    const angle = Math.atan2(y1 - y2, x1 - x2);

    const style =
      "padding:0px; margin:0px; height:" +
      props.thickness +
      "px; background-color:" +
      props.color +
      "; line-height:1px; position:absolute; left:" +
      cx +
      "px; top:" +
      cy +
      "px; width:" +
      length +
      "px; transform:rotate(" +
      angle +
      "rad);'";

    ref.style.cssText = style;
  };

  onMount(() => {
    console.log(
      props.div1().innerText +
        " " +
        (props.div2 !== undefined ? props.div2().innerText : "pointer")
    );
    window.addEventListener("pointermove", setStyle);
  });

  const {
    stateSignal: [state],
  } = usePatternContext();

  createEffect(() => {
    if (state() === "off") {
      window.removeEventListener("pointermove", setStyle);
      if (props.div2 === undefined) ref.remove();
    }
  });

  return <div class="select-none -z-10 rounded-full" ref={ref}></div>;
}
