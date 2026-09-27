import { LIMITS, MAX_JEWELS, SETTINGS, SHOWCASES, type Limit } from "./settingsValues";

const STORAGE_KEY = "necklace-splitting.state";
const STATE_VERSION = 1;
/** Groups the writes while a slider is dragged. */
const SAVE_DELAY_MS = 300;

type Vector3 = [number, number, number];

type StoredState = {
  /** The remembered settings, keyed by their path in SETTINGS, e.g. `necklace.discrete`. */
  settings?: Record<string, number | string | boolean>;
  /** Which input defined the necklace last: the configuration number or the text. */
  necklaceSource?: "number" | "string";
  /** Only set once the user switched the theme; until then it follows the system. */
  theme?: "light" | "dark";
  camera?: { position: Vector3; target: Vector3; up: Vector3 };
  /** The app version whose news were shown last (What's new); kept by Restore defaults. */
  lastSeenVersion?: string;
};

type Validator<T> = (value: unknown) => T | undefined;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const bool: Validator<boolean> = (value) => (typeof value === "boolean" ? value : undefined);
const string: Validator<string> = (value) => (typeof value === "string" ? value : undefined);
const range = (min: number, max: number): Validator<number> => (value) =>
  typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : undefined;
const integer = (min: number, max: number): Validator<number> => (value) =>
  Number.isInteger(value) ? range(min, max)(value) : undefined;
/** Within a control's limits; whole numbers for a control that steps by 1. */
const limited = (limit: Limit): Validator<number> =>
  limit.step === 1 ? integer(limit.min, limit.max) : range(limit.min, limit.max);
const oneOf = <T>(values: readonly T[]): Validator<T> => (value) =>
  values.includes(value as T) ? (value as T) : undefined;
const vector3: Validator<Vector3> = (value) =>
  Array.isArray(value) && value.length === 3 && value.every((item) => range(-1e6, 1e6)(item) !== undefined)
    ? (value as Vector3)
    : undefined;

/**
 * The settings that are remembered, with the ranges of their controls. The
 * rotation itself (`animation.run`) and the FPS monitor are not remembered.
 */
const SETTING_FIELDS: Record<string, Validator<number | string | boolean>> = {
  int_mode: integer(0, SHOWCASES.length - 1),
  "necklace.number_of_jewels": limited(LIMITS.number_of_jewels),
  "necklace.configuration": integer(0, 2 ** MAX_JEWELS - 1),
  "necklace.string": string,
  "necklace.discrete": bool,
  "necklace.show_solution_band": bool,
  "necklace.show_solutions": bool,
  "necklace.epsilon": limited(LIMITS.epsilon),
  "sphere.radius": limited(LIMITS.radius),
  "sphere.segments": limited(LIMITS.segments),
  "sphere.offset_octant": limited(LIMITS.offset_octant),
  "sphere.use_bad_on_sphere_check": bool,
  "sphere.show_borsuk_ulam_proof_shape": bool,
  "view.necklace_visible": bool,
  "view.gauge_visible": bool,
  "view.show_single_thiefs_region": bool,
  "view.axes_visible": bool,
  "view.mesh_visible": bool,
  "view.faces_visible": bool,
  "color.scale_red": limited(LIMITS.scale),
  "color.scale_green": limited(LIMITS.scale),
  "color.scale_blue": limited(LIMITS.scale),
  "color.alpha": limited(LIMITS.scale),
  "animation.rotation_x": limited(LIMITS.rotation),
  "animation.rotation_y": limited(LIMITS.rotation),
  "animation.rotation_z": limited(LIMITS.rotation),
};

/** The object holding a setting and its key there, e.g. [SETTINGS.necklace, "discrete"]. */
function locate(settings: object, path: string): [Record<string, unknown>, string] {
  const keys = path.split(".");
  const last = keys.pop()!;
  const owner = keys.reduce((object, key) => (object as Record<string, unknown>)[key] as object, settings);
  return [owner as Record<string, unknown>, last];
}

/** The remembered settings' current values. */
function collectSettings(settings: object = SETTINGS): Record<string, number | string | boolean> {
  return Object.fromEntries(Object.keys(SETTING_FIELDS).map((path) => {
    const [owner, key] = locate(settings, path);
    return [path, owner[key] as number | string | boolean];
  }));
}

/** Applies remembered settings to `settings`. */
function applySettings(stored: StoredState["settings"], settings: typeof SETTINGS = SETTINGS): void {
  for (const [path, value] of Object.entries(stored ?? {})) {
    const [owner, key] = locate(settings, path);
    owner[key] = value;
  }
  // A configuration beyond the number of jewels, as the Jewels control would clamp it.
  settings.necklace.configuration = Math.min(settings.necklace.configuration, 2 ** settings.necklace.number_of_jewels - 1);
}

function validateSettings(value: unknown): StoredState["settings"] {
  if (!isRecord(value)) {
    return undefined;
  }
  const result: Record<string, number | string | boolean> = {};
  for (const [path, validate] of Object.entries(SETTING_FIELDS)) {
    const field = validate(value[path]);
    if (field !== undefined) {
      result[path] = field;
    }
  }
  return result;
}

function validateCamera(value: unknown): StoredState["camera"] {
  if (!isRecord(value)) {
    return undefined;
  }
  const position = vector3(value.position);
  const target = vector3(value.target);
  const up = vector3(value.up);
  if (!position || !target || !up || position.every((item, index) => item === target[index]) || up.every((item) => item === 0)) {
    return undefined;
  }
  return { position, target, up };
}

function parseJson(text: string | null): unknown {
  try {
    return text === null ? undefined : JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * Reads a stored state. Anything unreadable - broken JSON, another format
 * version, a field of the wrong type or out of range - is dropped, so its
 * default applies.
 */
function parseState(text: string | null): StoredState {
  const json = parseJson(text);
  if (!isRecord(json) || json.version !== STATE_VERSION) {
    return {};
  }
  const state: StoredState = {};
  const settings = validateSettings(json.settings);
  const necklaceSource = oneOf(["number", "string"] as const)(json.necklaceSource);
  const theme = oneOf(["light", "dark"] as const)(json.theme);
  const camera = validateCamera(json.camera);
  const lastSeenVersion = typeof json.lastSeenVersion === "string" && /^\d+\.\d+\.\d+$/.test(json.lastSeenVersion) ? json.lastSeenVersion : undefined;
  if (settings) state.settings = settings;
  if (lastSeenVersion) state.lastSeenVersion = lastSeenVersion;
  if (necklaceSource) state.necklaceSource = necklaceSource;
  if (theme) state.theme = theme;
  if (camera) state.camera = camera;
  return state;
}

/** Local Storage can be unavailable (private mode, blocked site data) - even accessing it can throw. */
function localStorageOrUndefined(): Storage | undefined {
  try {
    return typeof localStorage === "undefined" ? undefined : localStorage;
  } catch {
    return undefined;
  }
}

/**
 * The settings and application state kept across reloads, in one Local
 * Storage entry. Each module reads its part on startup and reports changes
 * with {@link update}; the writes are delayed a little and flushed when the
 * page is hidden. Without storage, everything still works for the visit.
 */
class PersistentState {
  #storage: Storage | undefined;
  #state: StoredState;
  #timer: ReturnType<typeof setTimeout> | undefined;
  #enabled = true;
  #hadStoredState = false;

  constructor(storage: Storage | undefined = localStorageOrUndefined()) {
    this.#storage = storage;
    this.#state = this.load();
    if (typeof window !== "undefined") {
      window.addEventListener("pagehide", () => this.flush());
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          this.flush();
        }
      });
    }
  }

  get state(): Readonly<StoredState> {
    return this.#state;
  }

  /** Whether anything was stored before this visit, even if none of it was readable: the app was used before. */
  get hadStoredState(): boolean {
    return this.#hadStoredState;
  }

  update(changes: Partial<StoredState>): void {
    Object.assign(this.#state, changes);
    this.scheduleSave();
  }

  /** Writes a pending change right away. */
  flush(): void {
    if (this.#timer === undefined) {
      return;
    }
    clearTimeout(this.#timer);
    this.#timer = undefined;
    this.save();
  }

  /**
   * Forgets the stored state and stops saving, so a reload starts with the
   * defaults. Only the last seen version stays, so What's new is not shown again.
   */
  clear(): void {
    this.#enabled = false;
    clearTimeout(this.#timer);
    this.#timer = undefined;
    const { lastSeenVersion } = this.#state;
    this.#state = {};
    this.withStorage((storage) => {
      storage.removeItem(STORAGE_KEY);
      if (lastSeenVersion !== undefined) {
        storage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, lastSeenVersion }));
      }
    });
  }

  private load(): StoredState {
    let state: StoredState = {};
    this.withStorage((storage) => {
      const text = storage.getItem(STORAGE_KEY);
      this.#hadStoredState = text !== null;
      state = parseState(text);
    });
    return state;
  }

  private scheduleSave(): void {
    if (!this.#enabled) {
      return;
    }
    clearTimeout(this.#timer);
    this.#timer = setTimeout(() => {
      this.#timer = undefined;
      this.save();
    }, SAVE_DELAY_MS);
  }

  private save(): void {
    if (!this.#enabled) {
      return;
    }
    this.withStorage((storage) => {
      storage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, ...this.#state }));
    });
  }

  private withStorage(access: (storage: Storage) => void): void {
    if (!this.#storage) {
      return;
    }
    try {
      access(this.#storage);
    } catch {
      // Not remembered, but still in effect for this visit.
    }
  }
}

const persistentState = new PersistentState();

export { PersistentState, persistentState, parseState, applySettings, collectSettings, SETTING_FIELDS, STORAGE_KEY };
export type { StoredState, Vector3 };
