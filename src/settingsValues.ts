import { Events, Showcase } from "./Enums";

/** Vectors whose distance is less that EPS are treated equal. */
const EPS = 0.001;
const EPS_SQ = EPS * EPS;

/** Must match the u_input length in fragment.glsl */
const MAX_JEWELS = 32;

/**
 * These are the different display/viewing modes. The index of each mode is mapped to a constant, which eventually will be passed
 * as
 * <pre>
 * #define MODE_...
 * </pre>
 * to the GLSL shaders.
 */
const MODES = [
  "Stolen Necklace",
  "Shader Lamp",
  "Space Colors",
  "Sinusoid",
];

const SETTINGS = {
  showcase: MODES[Showcase.STOLEN_NECKLACE],
  int_mode: Showcase.STOLEN_NECKLACE,
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
    segments: 128,
    offset_octant: 0.0,
    use_bad_on_sphere_check: false,
    show_borsuk_ulam_proof_shape: false,
  },
  animation: {
    rotation_x: 0.0,
    rotation_y: 0.0,
    rotation_z: 0.0,
    reset_speed: resetAnimation,
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
  },
  color: {
    scale_red: 1.0,
    scale_green: 1.0,
    scale_blue: 1.0,
    alpha: 1.0,
  },
  capture: {},
  imprint: () => Events.dispatchEvent(Events.SHOW_IMPRINT),

  radio: MODES[Showcase.STOLEN_NECKLACE],
  // trick for debugging without console
  text: undefined,
};

function resetAnimation(): void {
  SETTINGS.animation.trigger_reset = true;
  SETTINGS.animation.run = false;
  SETTINGS.animation.rotation_x = 0;
  SETTINGS.animation.rotation_y = 0;
  SETTINGS.animation.rotation_z = 0;
}

export { EPS, EPS_SQ, MAX_JEWELS, MODES, SETTINGS };
