type TEventsMap = Readonly<Record<string, (event: KeyboardEvent) => void>>;

const DEFAULT_TIMEOUT = 1000;

const DEFAULT_KEY = "keydown";

const eventType = [DEFAULT_KEY, "keyup"] as const;

type TEventType = (typeof eventType)[number];

interface TOptions {
  timeout?: number;
  event?: TEventType;
}

/**
 * A basic prototype of the tinykeys lib
 * Takes a target and a map of key events to listen to an a function to call when matched
 * Returns an unsubscribe method.
 * @see https://github.com/jamiebuilds/tinykeys
 * @example
 * ```js
 * import { nycklar } from "../src/nycklar"
 *
 * nycklar(window, {
 * 	"d": () => {
 * 		console.log("pressed d");
 * 	},
 * 	"abc": () => {
 * 		console.log("pressed abc");
 * 	},
 * 	"Shift+D": () => {
 * 		console.log("pressed shift d");
 * 	},
 * })
 * ```
 */
export const nycklar = (
  target: Window | HTMLElement,
  keyEvents: TEventsMap,
  options: TOptions = {}
) => {
  let keysPressed: string[] = [];

  const { timeout = DEFAULT_TIMEOUT, event = DEFAULT_KEY } = options;

  let timer: number | null = null;

  const assertKeys = (key: string, event: KeyboardEvent) => {
    if (key in keyEvents) {
      keyEvents[key](event);
    }
    keysPressed = [];
  };

  const mapEvents = (e: Event) => {
    if (!(e instanceof KeyboardEvent)) return;
    const hasMetaKey = e.altKey || e.ctrlKey || e.shiftKey;
    keysPressed.push(e.key);
    const result = keysPressed.join(hasMetaKey ? "+" : "");
    if (typeof timer === "number") {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      assertKeys(result, e);
    }, timeout);
  };

  target.addEventListener(event, mapEvents);

  return () => {
    target.removeEventListener(event, mapEvents);
  };
};

nycklar(window, {
  d: () => {
    console.log("pressed d");
  },
  abc: () => {
    console.log("pressed abc");
  },
  "Shift+D": () => {
    console.log("pressed shift d");
  },
});
