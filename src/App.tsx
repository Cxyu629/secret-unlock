import { createSignal } from "solid-js";
import { PatternProvider } from "./contexts/PatternContext";
import Main from "./Main";

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="grid">
      <h1 class="text-2xl text-center pb-6 pt-4">secret unlock (Vite + Solid)</h1>
      <PatternProvider>
        <Main />
      </PatternProvider>
    </div>
  );
}

export default App;
