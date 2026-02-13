import { afterEach, describe, expect, it, vi } from "vitest";
import { nycklar } from ".";

vi.useFakeTimers();

describe("nycklar", () => {
	const keyEvents = {
		a: vi.fn(),
		ab: vi.fn(),
		"Shift+D": vi.fn(),
	};

	afterEach(() => {
		vi.clearAllTimers();
		vi.resetAllMocks();
	});

	const createKeyboardEvent = (
		key: string,
		options: KeyboardEventInit = {},
	): KeyboardEvent => new KeyboardEvent("keydown", { key, ...options });

	it("should handle single key press", async () => {
		nycklar(window, keyEvents);

		const keydownEvent = createKeyboardEvent("a");
		window.dispatchEvent(keydownEvent);

		vi.runAllTimers();

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

		vi.runOnlyPendingTimers();

		expect(keyEvents.ab).toHaveBeenCalled();
		expect(keyEvents.a).not.toHaveBeenCalled();
	});

	it("should handle shift key presses", () => {
		nycklar(window, keyEvents);

		const eventA = createKeyboardEvent("Shift", { shiftKey: true });
		const eventB = createKeyboardEvent("D", { shiftKey: true });
		window.dispatchEvent(eventA);
		window.dispatchEvent(eventB);

		vi.runOnlyPendingTimers();

		expect(keyEvents["Shift+D"]).toHaveBeenCalled();
		expect(keyEvents.ab).not.toHaveBeenCalled();
	});

	it("should ignore non-keyboard events", () => {
		nycklar(window, keyEvents);

		const eventA = new MouseEvent("click");
		window.dispatchEvent(eventA);

		vi.runOnlyPendingTimers();

		expect(keyEvents.a).not.toHaveBeenCalled();
	});

	it("should ignore input events", () => {
		const target = document.createElement("input");
		nycklar(target, keyEvents);

		const eventA = createKeyboardEvent("a");
		target.dispatchEvent(eventA);

		vi.runOnlyPendingTimers();

		expect(keyEvents.a).not.toHaveBeenCalled();
	});
});
