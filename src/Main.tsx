import { VoidComponent } from "solid-js";
import { createStore } from "solid-js/store";
import UnlockInterface from "./UnlockInterface";
import PatternTrace from "./PatternTrace";
import SettingsPanel from "./SettingsPanel";
import LogPanel from "./LogPanel";

const Main: VoidComponent = () => {
  const [refs, setRefs] = createStore<HTMLDivElement[]>(
    Array(12).fill(undefined)
  );

  return (
    <>
      <div class="flex flex-col sm:flex-row flex-wrap md:w-2/2 justify-self-center gap-10 justify-center sm:mx-20">
        <div class="flex flex-col gap-5">
          <SettingsPanel />
          <UnlockInterface refs={refs} setRefs={setRefs} />
        </div>
        <LogPanel />
      </div>

      <PatternTrace refs={refs} />
    </>
  );
};

export default Main;
