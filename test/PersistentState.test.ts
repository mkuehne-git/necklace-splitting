import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PersistentState, STORAGE_KEY, applySettings, collectSettings, parseState } from "../src/settings/PersistentState";
import { SETTINGS } from "../src/settings/settingsValues";

/** A minimal in-memory Local Storage. */
function memoryStorage(entries: Record<string, string> = {}): Storage {
  const map = new Map(Object.entries(entries));
  return {
    get length() { return map.size; },
    key: (index) => [...map.keys()][index] ?? null,
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => { map.set(key, String(value)); },
    removeItem: (key) => { map.delete(key); },
    clear: () => map.clear(),
  };
}

const stored = (storage: Storage) => JSON.parse(storage.getItem(STORAGE_KEY)!);
const defaults = structuredClone(SETTINGS);

afterEach(() => {
  // Back to the defaults for the next test.
  applySettings(collectSettings(defaults));
});

describe("parseState", () => {
  it("returns nothing for a missing entry, broken JSON or another version", () => {
    expect(parseState(null)).toEqual({});
    expect(parseState("{broken")).toEqual({});
    expect(parseState("[1]")).toEqual({});
    expect(parseState(JSON.stringify({ version: 2, theme: "dark" }))).toEqual({});
  });

  it("keeps valid fields and drops the others", () => {
    const state = parseState(JSON.stringify({
      version: 1,
      settings: {
        int_mode: 2,
        "necklace.number_of_jewels": 12,
        "necklace.discrete": "yes",
      "necklace.epsilon": 0.5,
        "necklace.string": "AB",
        "sphere.segments": 5000,
        "color.alpha": 0.5,
        "animation.run": true,
        unknown: 1,
      },
      necklaceSource: "text",
      theme: "dark",
      camera: { position: [1, 2, 3], target: [0, 0, 0], up: [0, 1, 0] },
      other: true,
    }));
    expect(state).toEqual({
      settings: { int_mode: 2, "necklace.number_of_jewels": 12, "necklace.string": "AB", "color.alpha": 0.5 },
      theme: "dark",
      camera: { position: [1, 2, 3], target: [0, 0, 0], up: [0, 1, 0] },
    });
  });

  it("keeps a last seen version only in x.y.z form", () => {
    const seen = (value: unknown) => parseState(JSON.stringify({ version: 1, lastSeenVersion: value })).lastSeenVersion;
    expect(seen("0.8.1")).toBe("0.8.1");
    expect(seen("0.8")).toBeUndefined();
    expect(seen(81)).toBeUndefined();
  });

  it("drops a camera looking at its own position or without an up direction", () => {
    const camera = (value: object) => parseState(JSON.stringify({ version: 1, camera: value })).camera;
    expect(camera({ position: [1, 2, 3], target: [1, 2, 3], up: [0, 1, 0] })).toBeUndefined();
    expect(camera({ position: [1, 2, 3], target: [0, 0, 0], up: [0, 0, 0] })).toBeUndefined();
    expect(camera({ position: [1, 2], target: [0, 0, 0], up: [0, 1, 0] })).toBeUndefined();
  });

  it("accepts only whole numbers in range for the showcase and the jewels", () => {
    const settings = (value: object) => parseState(JSON.stringify({ version: 1, settings: value })).settings;
    expect(settings({ int_mode: 1.5, "necklace.number_of_jewels": 33 })).toEqual({});
    expect(settings({ int_mode: 4, "necklace.number_of_jewels": -1 })).toEqual({});
    expect(settings({ int_mode: 3, "necklace.number_of_jewels": 32 })).toEqual({ int_mode: 3, "necklace.number_of_jewels": 32 });
  });
});

describe("applySettings and collectSettings", () => {
  it("round-trip the remembered settings", () => {
    applySettings({ int_mode: 1, "necklace.number_of_jewels": 10, "view.axes_visible": false, "animation.rotation_y": 0.3 });
    expect(SETTINGS.int_mode).toBe(1);
    expect(SETTINGS.necklace.number_of_jewels).toBe(10);
    expect(SETTINGS.view.axes_visible).toBe(false);
    const collected = collectSettings();
    expect(collected).toMatchObject({ int_mode: 1, "necklace.number_of_jewels": 10, "view.axes_visible": false, "animation.rotation_y": 0.3 });
    expect(collected).not.toHaveProperty("animation.run");
  });

  it("clamps a configuration that needs more jewels than there are", () => {
    applySettings({ "necklace.number_of_jewels": 4, "necklace.configuration": 1000 });
    expect(SETTINGS.necklace.configuration).toBe(15);
  });
});

describe("PersistentState", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("reads the stored state", () => {
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify({ version: 1, theme: "dark" }) });
    expect(new PersistentState(storage).state).toEqual({ theme: "dark" });
  });

  it("groups quick changes into one write", () => {
    const storage = memoryStorage();
    const setItem = vi.spyOn(storage, "setItem");
    const state = new PersistentState(storage);
    state.update({ theme: "dark" });
    state.update({ necklaceSource: "string" });
    expect(setItem).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(setItem).toHaveBeenCalledOnce();
    expect(stored(storage)).toEqual({ version: 1, theme: "dark", necklaceSource: "string" });
  });

  it("writes a pending change right away on flush", () => {
    const storage = memoryStorage();
    const state = new PersistentState(storage);
    state.update({ theme: "light" });
    state.flush();
    expect(stored(storage)).toEqual({ version: 1, theme: "light" });
  });

  it("forgets everything on clear and stops saving", () => {
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify({ version: 1, theme: "dark" }) });
    const state = new PersistentState(storage);
    state.update({ necklaceSource: "string" });
    state.clear();
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
    // A change right before the reload must not bring the state back.
    state.update({ theme: "light" });
    vi.advanceTimersByTime(300);
    state.flush();
    expect(storage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("keeps the last seen version on clear, so What's new is not shown again", () => {
    const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify({ version: 1, theme: "dark", lastSeenVersion: "0.8.1" }) });
    new PersistentState(storage).clear();
    expect(stored(storage)).toEqual({ version: 1, lastSeenVersion: "0.8.1" });
  });

  it("tells whether anything was stored before this visit", () => {
    expect(new PersistentState(memoryStorage()).hadStoredState).toBe(false);
    expect(new PersistentState(memoryStorage({ [STORAGE_KEY]: "{broken" })).hadStoredState).toBe(true);
  });

  it("works for the visit without storage, or when storage throws", () => {
    const withoutStorage = new PersistentState(undefined);
    withoutStorage.update({ theme: "dark" });
    expect(withoutStorage.state.theme).toBe("dark");

    const failing = memoryStorage();
    failing.getItem = () => { throw new Error("blocked"); };
    failing.setItem = () => { throw new Error("full"); };
    const state = new PersistentState(failing);
    state.update({ theme: "dark" });
    expect(() => vi.advanceTimersByTime(300)).not.toThrow();
    expect(state.state.theme).toBe("dark");
  });
});
