import { PatternProvider } from "./contexts/PatternContext";
import Main from "./Main";

function App() {
  return (
    <div class="grid">
      <h1 class="text-2xl text-center pb-6 pt-4">
        secret unlock (Vite + Solid)
      </h1>
      <PatternProvider>
        <Main />
      </PatternProvider>
    </div>
  );
}

export default App;
