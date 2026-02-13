import { useEffect, useRef, useState, useCallback } from 'react';
import { nycklar } from '../../src/index';
import type { Shortcut, Options } from './App';

interface LogEntry {
  timestamp: string;
  message: string;
}

interface TestPanelProps {
  shortcuts: Shortcut[];
  options: Options;
}

export const TestPanel = ({ shortcuts, options }: TestPanelProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [flash, setFlash] = useState(false);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLog((prev) => [{ timestamp, message }, ...prev]);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  }, []);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const validShortcuts = shortcuts.filter((s) => s.combo.trim());
    if (validShortcuts.length === 0) return;

    const eventsMap: Record<string, (event: KeyboardEvent) => void> = {};
    for (const s of validShortcuts) {
      eventsMap[s.combo] = () => addLog(`Triggered: "${s.label || s.combo}" (${s.combo})`);
    }

    const cleanup = nycklar(el, eventsMap, {
      timeout: options.timeout,
      event: options.event,
    });

    return cleanup;
  }, [shortcuts, options, addLog]);

  return (
    <div className="panel test-panel">
      <h2>Test area</h2>
      <div
        ref={targetRef}
        tabIndex={0}
        className={`test-target ${flash ? 'flash' : ''}`}
      >
        Click here and press keys
      </div>
      <div className="log-header">
        <h3>Event log</h3>
        <button type="button" onClick={() => setLog([])}>Clear</button>
      </div>
      <ul className="log">
        {log.map((entry, i) => (
          <li key={`${entry.timestamp}-${i}`}>
            <span className="log-time">{entry.timestamp}</span> {entry.message}
          </li>
        ))}
        {log.length === 0 && <li className="log-empty">No events yet</li>}
      </ul>
    </div>
  );
};
