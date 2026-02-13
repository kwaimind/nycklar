import { useState } from "react";
import { ConfigPanel } from "./ConfigPanel";
import { TestPanel } from "./TestPanel";

export interface Shortcut {
  id: string;
  combo: string;
  label: string;
}

export interface Options {
  timeout: number;
  event: "keydown" | "keyup";
}

const defaultShortcuts: Shortcut[] = [
  { id: crypto.randomUUID(), combo: "d", label: "Single key" },
  { id: crypto.randomUUID(), combo: "abc", label: "Sequence" },
  { id: crypto.randomUUID(), combo: "Shift+D", label: "Modifier combo" },
];

const defaultOptions: Options = {
  timeout: 150,
  event: "keydown",
};

export const App = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(defaultShortcuts);
  const [options, setOptions] = useState<Options>(defaultOptions);

  return (
    <div className="app">
      <h1>nycklar playground</h1>
      <div className="panels">
        <ConfigPanel
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          options={options}
          setOptions={setOptions}
        />
        <TestPanel shortcuts={shortcuts} options={options} />
      </div>
    </div>
  );
};
