// To configure settings
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { Events, Showcase } from "./Enums";
import { Imprint } from "./Imprint";

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
    dark_theme: true,
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
  imprint: showImprint,

  radio: MODES[Showcase.STOLEN_NECKLACE],
  // trick for debugging without console
  text: undefined,
};
class Settings {
  private _captureFolder: any;
  static addRadioButtonsFolder(
    parent,
    folderName,
    object,
    options,
    onChange = (obj, prop, index) => {}
  ) {
    // Create the folder
    const folder = parent.addFolder(folderName);
    return Settings.addRadioButtons(folder, object, options, onChange);
  }

  static addRadioButtons(
    parent,
    object,
    options,
    onChange = (obj, prop, index) => {}
  ) {
    const initial = object;
    object = {};
    // create property for each object
    options.forEach((value, index) => {
      const property = `option_${index}`;
      object[property] = initial === value;
    });

    // create the dat.gui buttons
    options.forEach((value, index) => {
      const property = `option_${index}`;
      const constroller = parent
        .add(object, property)
        .name(value)
        .listen()
        .onChange(() => {
          for (let prop in object) {
            object[prop] = property === prop;
          }
          onChange(object, property, index);
        });
    });
    return parent;
  }
  private gui;
  constructor() {
    this.gui = new GUI();
    this.gui.domElement.id = "gui";

    const showcaseFolder = Settings.addRadioButtonsFolder(
      this.gui,
      `Showcase: ${SETTINGS.radio}`,
      SETTINGS.radio,
      MODES,
      (object, property, index) => {
        SETTINGS.int_mode = index;
        Settings.dispatchEvent(Events.CREATE_SPHERE);
        showcaseFolder.name = `Showcase: ${MODES[index]}`;
        showcaseFolder.close();
      }
    );

    const necklaceFolder = this.gui.addFolder("Necklace");
    necklaceFolder
      .add(SETTINGS.necklace, "number_of_jewels", 0, MAX_JEWELS, 1)
      .name("Jewels")
      .onChange(() => {
        const MAX_CONFIGURATION = 2 ** SETTINGS.necklace.number_of_jewels - 1;
        SETTINGS.necklace.configuration = Math.min(
          MAX_CONFIGURATION,
          SETTINGS.necklace.configuration
        );
        configurationController
          .min(0)
          .max(MAX_CONFIGURATION)
          .setValue(SETTINGS.necklace.configuration);
        Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
      });
    const configurationController = necklaceFolder
      .add(
        SETTINGS.necklace,
        "configuration",
        0,
        2 ** SETTINGS.necklace.number_of_jewels - 1,
        1
      )
      .name("Configuration")
      .onChange(() =>
        Settings.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER)
      );
    necklaceFolder
      .add(SETTINGS.necklace, "string")
      .name("String")
      .onChange(() =>
        Settings.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_STRING)
      );
    necklaceFolder
      .add(SETTINGS.necklace, "discrete")
      .name("Discrete")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    necklaceFolder
      .add(SETTINGS.necklace, "show_solution_band")
      .name("Solution Band")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    necklaceFolder
      .add(SETTINGS.necklace, "show_solutions")
      .name("Solutions")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    necklaceFolder
      .add(SETTINGS.necklace, "epsilon", 0, 0.15)
      .name("epsilon")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));

    const viewFolder = this.gui.addFolder("View");
    viewFolder
      .add(SETTINGS.view, "dark_theme")
      .name(`Dark theme`)
      .onChange(() => Settings.dispatchEvent(Events.THEME_CHANGED));
    viewFolder
      .add(SETTINGS.view, "show_single_thiefs_region")
      .name(`Single Thief's Area`)
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    viewFolder
      .add(SETTINGS.view, "axes_visible")
      .name("Axes")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));
    viewFolder
      .add(SETTINGS.view, "mesh_visible")
      .name("Mesh")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));
    viewFolder
      .add(SETTINGS.view, "faces_visible")
      .name("Faces")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));

    const sphereFolder = viewFolder.addFolder("Sphere");
    sphereFolder
      .add(SETTINGS.sphere, "radius", 1, 50, 1)
      .name("Radius")
      .onChange(() => Settings.dispatchEvent(Events.CREATE_SPHERE));
    sphereFolder
      .add(SETTINGS.sphere, "offset_octant", 0.0, 5.0, 0.1)
      .name("Octant Offset")
      .onChange(() => Settings.dispatchEvent(Events.CREATE_SPHERE));
    sphereFolder
      .add(SETTINGS.sphere, "use_bad_on_sphere_check")
      .name("Bad Check")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    sphereFolder
      .add(SETTINGS.sphere, "segments", 3, 511, 1)
      .name("Segments")
      .onChange(() => Settings.dispatchEvent(Events.CREATE_SPHERE));

    const controlsSubFolder = viewFolder.addFolder("Other Controls");
    controlsSubFolder
      .add(SETTINGS.view, "stats_monitor_visible")
      .name(`Monitor`)
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));
    controlsSubFolder
      .add(SETTINGS.view, "necklace_visible")
      .name(`Necklace`)
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));
    controlsSubFolder
      .add(SETTINGS.view, "gauge_visible")
      .name(`Gauge`)
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_VISIBLE));

    const colorFolder = viewFolder.addFolder("Color");
    colorFolder
      .add(SETTINGS.color, "scale_red", 0.0, 1.0)
      .name("Red")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    colorFolder
      .add(SETTINGS.color, "scale_green", 0.0, 1.0)
      .name("Green")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    colorFolder
      .add(SETTINGS.color, "scale_blue", 0.0, 1.0)
      .name("Blue")
      .onChange(() => Settings.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    colorFolder
      .add(SETTINGS.color, "alpha", 0.0, 1.0)
      .name("Alpha")
      .onChange(() => Settings.dispatchEvent(Events.CREATE_SPHERE));

    const animationFolder = viewFolder.addFolder("Animation");
    const MAX_ROT = 0.5;
    animationFolder.add(SETTINGS.animation, "run").name("Rotate [Hz]").listen();
    animationFolder
      .add(SETTINGS.animation, "rotation_x", -MAX_ROT, MAX_ROT, 0.1)
      .name("X")
      .listen();
    animationFolder
      .add(SETTINGS.animation, "rotation_y", -MAX_ROT, MAX_ROT, 0.1)
      .name("Y")
      .listen();
    animationFolder
      .add(SETTINGS.animation, "rotation_z", -MAX_ROT, MAX_ROT, 0.1)
      .name("Z")
      .listen();
    animationFolder.add(SETTINGS.animation, "reset_speed").name("Reset Rotation");

    this._captureFolder = this.gui.addFolder("Screen capture");

    // Configure imprint
    const imprint = new Imprint();
    const p = imprint.isAvailable();
    p.then((available) => {
      if (available) {
        this.gui.add(SETTINGS, "imprint").name("Imprint");
      }
    });
  }
  static dispatchEvent(event: Events): void {
    const evt = new Event(event.toString(), { bubbles: true });
    document.body.dispatchEvent(evt);
  }

  get captureFolder() {
    return this._captureFolder;
  }
}

function resetAnimation() {
  SETTINGS.animation.trigger_reset = true;
  SETTINGS.animation.run = false;
  SETTINGS.animation.rotation_x = 0;
  SETTINGS.animation.rotation_y = 0;
  SETTINGS.animation.rotation_z = 0;
}

function showImprint() {
  Settings.dispatchEvent(Events.SHOW_IMPRINT);
}

export { EPS, EPS_SQ, MAX_JEWELS, SETTINGS, Settings };
