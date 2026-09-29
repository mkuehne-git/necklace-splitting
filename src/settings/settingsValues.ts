/** The end-to-end test build (`VITE_E2E=true`) uses a coarser sphere, so that WebGL in headless browsers stays fast. */
// import.meta.env is Vite's; e2e/split.spec.ts loads this module in Node, where it is missing.
const E2E_BUILD = import.meta.env?.VITE_E2E === 'true';

/** Vectors whose distance is less that EPS are treated equal. */
const EPS = 0.001;
const EPS_SQ = EPS * EPS;

/** The fastest rotation of the animation, per axis, in Hz. */
const MAX_ROT = 0.5;

/** Must match the u_input length in fragment.glsl */
const MAX_JEWELS = 32;

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
    show_borsuk_ulam_proof_shape: false,
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
  },
  color: {
    scale_red: 1.0,
    scale_green: 1.0,
    scale_blue: 1.0,
    alpha: 1.0,
  },
  capture: "All" as CaptureTarget,
  // trick for debugging without console
  text: undefined as string | undefined,
};

/** The largest configuration number for the current number of jewels. */
function maxConfiguration(): number {
  return 2 ** SETTINGS.necklace.number_of_jewels - 1;
}

/** Stops the rotation and turns the sphere back; the render loop applies it. */
function resetAnimation(): void {
  SETTINGS.animation.trigger_reset = true;
  SETTINGS.animation.run = false;
  SETTINGS.animation.rotation_x = 0;
  SETTINGS.animation.rotation_y = 0;
  SETTINGS.animation.rotation_z = 0;
}

export { EPS, EPS_SQ, LIGHTINGS, LIMITS, MAX_JEWELS, MAX_ROT, SETTINGS, maxConfiguration, resetAnimation };
export type { CaptureTarget, Lighting, Limit };
