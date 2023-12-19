import debounce from "debounce";

type TEventsMap = Readonly<Record<string, (event: KeyboardEvent) => void>>;

const DEFAULT_KEY = "keydown";

/**
 * A basic prototype of the tinykeys lib
 * Takes a target and a map of key events to listen to an a function to call when matched
 * @see https://github.com/jamiebuilds/tinykeys
 */
const nycklar = (target: Window | HTMLElement, keyEvents: TEventsMap) => {
  let keysPressed: string[] = [];

  const assertKeys = debounce((key: string, event: KeyboardEvent) => {
    if (key in keyEvents) {
      keyEvents[key](event);
    }
    keysPressed = [];
  }, 250);

  const mapEvents = (e: KeyboardEvent) => {
    const hasMetaKey = e.altKey || e.ctrlKey || e.shiftKey;
    keysPressed.push(e.key);
    const result = keysPressed.join(hasMetaKey ? "+" : "");
    assertKeys(result, e);
  };

  const createListener = (e: Event) => {
    if (!(e instanceof KeyboardEvent)) return;
    mapEvents(e);
  };

  target.addEventListener(DEFAULT_KEY, createListener);

  return () => {
    target.removeEventListener(DEFAULT_KEY, createListener);
  };
};

const events = {
  d: () => {
    console.log("pressed d");
  },
  abc: () => {
    console.log("pressed abc");
  },
  "Shift+D": () => {
    console.log("pressed shift d");
  },
};

nycklar(window, events);
