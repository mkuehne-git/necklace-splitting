/** The end-to-end test build (`VITE_E2E=true`) uses a coarser sphere, so that WebGL in headless browsers stays fast. */
// import.meta.env is Vite's; e2e/split.spec.ts loads this module in Node, where it is missing.
const E2E_BUILD = import.meta.env?.VITE_E2E === 'true';

/** Vectors whose distance is less that EPS are treated equal. */
const EPS = 0.001;
const EPS_SQ = EPS * EPS;

/** The fastest rotation of the animation, per axis, in Hz. */
const MAX_ROT = 0.5;

/** The most jewels of a necklace given by its configuration number (Jewels). */
const MAX_JEWELS = 32;

/**
 * The most jewels any necklace may have, also one given by a text: the shader
 * gets a uniform per jewel (u_input), and WebGL 2 guarantees only 224 uniform
 * vectors to a fragment shader. Beyond that the shader fails on some devices
 * and the sphere disappears; long necklaces are also slow, since the shader
 * loops over all jewels for every pixel.
 */
const MAX_NECKLACE_JEWELS = 192;

type Limit = { min: number; max: number; step?: number };

/** The ranges of the numeric settings, for their controls and for validating stored values. */
const LIMITS = {
  number_of_jewels: { min: 0, max: MAX_JEWELS, step: 1 },
  epsilon: { min: 0, max: 0.15, step: 0.005 },
  radius: { min: 1, max: 50, step: 1 },
  segments: { min: 3, max: 511, step: 1 },
  offset_octant: { min: 0, max: 5, step: 0.1 },
  scale: { min: 0, max: 1, step: 0.01 },
  rotation: { min: -MAX_ROT, max: MAX_ROT, step: 0.1 },
} satisfies Record<string, Limit>;

type CaptureTarget = "All" | "Sphere" | "Necklace";

/** What is shaded by the headlight: nothing, the Borsuk-Ulam shape, or the sphere too. */
const LIGHTINGS = ["Off", "Shape", "Always"] as const;
type Lighting = (typeof LIGHTINGS)[number];

/** What sets the cuts: the pointer on the sphere, or the handles on the necklace (the view switcher's mode buttons). */
const INPUTS = ["Sphere", "Necklace"] as const;
type Input = (typeof INPUTS)[number];

const SETTINGS = {
  necklace: {
    number_of_jewels: 24,
    configuration: 13579652,
    string: "",
    show_solution_band: true,
    show_solutions: true,
    epsilon: 0.01,
    discrete: true,
  },
  sphere: {
    radius: 15,
    segments: E2E_BUILD ? 32 : 128,
    offset_octant: 0.0,
    /** The view switcher's Borsuk-Ulam toggle (ui/ViewSwitcher.ts): the shape instead of the sphere. */
    show_borsuk_ulam_proof_shape: false,
    /** How far the sphere is morphed into the shape, 0 to 1; not remembered, it follows the toggle at startup. */
    morph: 0,
  },
  animation: {
    rotation_x: 0.0,
    rotation_y: 0.0,
    rotation_z: 0.0,
    trigger_reset: false,
    run: false,
  },
  view: {
    stats_monitor_visible: false,
    necklace_visible: true,
    gauge_visible: true,
    show_single_thiefs_region: true,
    axes_visible: true,
    mesh_visible: false,
    faces_visible: true,
    lighting: "Shape" as Lighting,
    input: "Sphere" as Input,
  },
  color: {
    scale_red: 1.0,
    scale_green: 1.0,
    scale_blue: 1.0,
    alpha: 1.0,
  },
  capture: "All" as CaptureTarget,
};

/** The largest configuration number for the current number of jewels. */
function maxConfiguration(): number {
  return 2 ** SETTINGS.necklace.number_of_jewels - 1;
}

/** Whether the necklace's handles set the cuts: in their mode, and not with the Borsuk-Ulam shape, which hides the necklace. */
function cutsFromNecklace(): boolean {
  return SETTINGS.view.input === "Necklace" && !SETTINGS.sphere.show_borsuk_ulam_proof_shape;
}

type SolutionHint = "show_solution_band" | "show_solutions";

/**
 * The game (cuts from the necklace) hides the solutions, so they are found
 * rather than seen: what the settings' checkboxes turn on again for this game.
 * Not remembered; each new game starts hidden again (resetSolutionHints).
 */
const gameHints: Partial<Record<SolutionHint, boolean>> = {};

/** Whether a solution hint is shown: during the game as it chose, otherwise as the settings say. */
function solutionHintShown(key: SolutionHint): boolean {
  return cutsFromNecklace() ? gameHints[key] ?? false : SETTINGS.necklace[key];
}

/** Shows or hides a solution hint: for this game only while it runs, otherwise in the settings. */
function setSolutionHint(key: SolutionHint, shown: boolean): void {
  if (cutsFromNecklace()) {
    gameHints[key] = shown;
  } else {
    SETTINGS.necklace[key] = shown;
  }
}

/** Forgets what the last game showed: on entering or leaving it. */
function resetSolutionHints(): void {
  delete gameHints.show_solution_band;
  delete gameHints.show_solutions;
}

/** Stops the rotation and turns the sphere back; the render loop applies it. */
function resetAnimation(): void {
  SETTINGS.animation.trigger_reset = true;
  SETTINGS.animation.run = false;
  SETTINGS.animation.rotation_x = 0;
  SETTINGS.animation.rotation_y = 0;
  SETTINGS.animation.rotation_z = 0;
}

export { EPS, EPS_SQ, INPUTS, LIGHTINGS, LIMITS, MAX_JEWELS, MAX_NECKLACE_JEWELS, MAX_ROT, SETTINGS, cutsFromNecklace, maxConfiguration, resetAnimation, resetSolutionHints, setSolutionHint, solutionHintShown };
export type { CaptureTarget, Input, Lighting, Limit, SolutionHint };
