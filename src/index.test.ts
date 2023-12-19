import { nycklar } from ".";

jest.useFakeTimers();

describe("nycklar", () => {
  const keyEvents = {
    a: jest.fn(),
    ab: jest.fn(),
    "Shift+D": jest.fn(),
  };

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  const createKeyboardEvent = (
    key: string,
    options: KeyboardEventInit = {}
  ): KeyboardEvent => new KeyboardEvent("keydown", { key, ...options });

  it("should handle single key press", async () => {
    nycklar(window, keyEvents);

    const keydownEvent = createKeyboardEvent("a");
    window.dispatchEvent(keydownEvent);

    jest.runAllTimers();

    expect(keyEvents.a).toHaveBeenCalled();
  });

  it("should return an unsubscribe function", async () => {
    const cleanup = nycklar(window, keyEvents);
    expect(cleanup).toEqual(expect.any(Function));
  });

  it("should handle multiple key presses", () => {
    nycklar(window, keyEvents);

    const eventA = createKeyboardEvent("a");
    const eventB = createKeyboardEvent("b");
    window.dispatchEvent(eventA);
    window.dispatchEvent(eventB);

    jest.runOnlyPendingTimers();

    expect(keyEvents.ab).toHaveBeenCalled();
    expect(keyEvents.a).not.toHaveBeenCalled();
  });

  it.skip("should handle shift key presses", () => {
    nycklar(window, keyEvents);

    const eventA = createKeyboardEvent("d", { shiftKey: true });
    window.dispatchEvent(eventA);

    jest.runOnlyPendingTimers();

    expect(keyEvents["Shift+D"]).toHaveBeenCalled();
  });

  /* test("should handle key presses with meta key", () => {
    const eventA = createKeyboardEvent("a", { altKey: true });
    const eventB = createKeyboardEvent("b", { ctrlKey: true });
    document.dispatchEvent(eventA);
    document.dispatchEvent(eventB);
    expect(keyEvents["a+Alt"]).toHaveBeenCalledWith(eventA);
    expect(keyEvents["b+Control"]).toHaveBeenCalledWith(eventB);
  }); */
});
