import clsx from "clsx";
import { Accessor, ParentComponent, Setter } from "solid-js";
import { Portal } from "solid-js/web";

const Modal: ParentComponent<{
  openWhen: Accessor<boolean>;
  close: Setter<boolean>;
}> = (props) => {
  return (
    <Portal>
      <div
        class={clsx(
          "fixed top-0 left-0 w-full h-full justify-center",
          (props.openWhen() && "flex") || "hidden"
        )}
      >
        <div class="absolute backdrop-brightness-50 w-full h-full"></div>
        <div class="absolute lg:w-1/2 md:w-2/3 sm:w-5/6 w-11/12 h-2/3 top-[16.666667%] bg-[#242424] backdrop-brightness-100">
          <div class="flex flex-col justify-between w-full h-full  p-5">
            <div>{props.children}</div>
            <div class="flex justify-center">
              <input
                class="border p-2 rounded-md hover:backdrop-brightness-125 active:backdrop-brightness-75"
                type="button"
                value="Close"
                onClick={() => props.close(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
