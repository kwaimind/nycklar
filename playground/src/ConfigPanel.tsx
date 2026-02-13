import type { Shortcut, Options } from './App';

interface ConfigPanelProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
  options: Options;
  setOptions: React.Dispatch<React.SetStateAction<Options>>;
}

export const ConfigPanel = ({
  shortcuts,
  setShortcuts,
  options,
  setOptions,
}: ConfigPanelProps) => {
  const addShortcut = () => {
    setShortcuts((prev) => [
      ...prev,
      { id: crypto.randomUUID(), combo: '', label: '' },
    ]);
  };

  const removeShortcut = (id: string) => {
    setShortcuts((prev) => prev.filter((s) => s.id !== id));
  };

  const updateShortcut = (id: string, field: 'combo' | 'label', value: string) => {
    setShortcuts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  return (
    <div className="panel config-panel">
      <h2>Shortcuts</h2>
      <div className="shortcut-list">
        {shortcuts.map((s) => (
          <div key={s.id} className="shortcut-row">
            <input
              type="text"
              value={s.combo}
              onChange={(e) => updateShortcut(s.id, 'combo', e.target.value)}
              placeholder="combo (e.g. Shift+D)"
            />
            <input
              type="text"
              value={s.label}
              onChange={(e) => updateShortcut(s.id, 'label', e.target.value)}
              placeholder="label"
            />
            <button type="button" onClick={() => removeShortcut(s.id)}>×</button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addShortcut}>+ Add shortcut</button>

      <h2>Options</h2>
      <div className="options">
        <label>
          Timeout (ms)
          <input
            type="number"
            value={options.timeout}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, timeout: Number(e.target.value) }))
            }
            min={0}
            step={100}
          />
        </label>
        <label>
          Event type
          <select
            value={options.event}
            onChange={(e) =>
              setOptions((prev) => ({
                ...prev,
                event: e.target.value as Options['event'],
              }))
            }
          >
            <option value="keydown">keydown</option>
            <option value="keyup">keyup</option>
          </select>
        </label>
      </div>

      <p className="help-text">
        Format: single chars for sequences (<code>abc</code>), <code>Shift+D</code> for modifiers.
        Click the test area and press keys to trigger.
      </p>
    </div>
  );
};
