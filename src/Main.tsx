import { createSignal, onMount, VoidComponent } from "solid-js";
import { createStore } from "solid-js/store";
import UnlockInterface from "./UnlockInterface";
import PatternTrace from "./PatternTrace";
import SettingsPanel from "./SettingsPanel";
import LogPanel from "./LogPanel";
import Modal from "./components/modal";

const Main: VoidComponent = () => {
  const [instructionModal, setInstructionModal] = createSignal(false);

  const [refs, setRefs] = createStore<HTMLDivElement[]>(
    Array(12).fill(undefined)
  );

  onMount(() => setInstructionModal(true));

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

      <Modal openWhen={instructionModal} close={setInstructionModal}>
        <p class="text-2xl mb-3">Instructions</p>
        <p>Step 1:</p>
        <p>
          Input your answer(s) in the "PIN answer" and/or "pattern answer"
          boxes.
        </p>
        <br />
        <p>Step 2:</p>
        <p>Enter your PIN/pattern password(s).</p>
        <br />
        <p>Step 3:</p>
        <p>Click/press "OK".</p>
      </Modal>
    </>
  );
};

export default Main;
