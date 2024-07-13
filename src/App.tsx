import { PatternProvider } from "./contexts/PatternContext";
import { PinProvider } from "./contexts/PinContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import Main from "./Main";

function App() {
  return (
    <div class="grid">
      <h1 class="text-2xl text-center pb-6 pt-4">
        secret unlock (Vite + Solid)
      </h1>
      <PatternProvider>
        <PinProvider>
          <SettingsProvider>
            <Main />
          </SettingsProvider>
        </PinProvider>
      </PatternProvider>
    </div>
  );
}

export default App;
