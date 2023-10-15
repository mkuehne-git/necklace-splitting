// To configure settings
import { Controller, GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { Events, Showcase } from "./Enums";
import { ClassMutationObserver } from './ClassMutationObserver';
import { Imprint } from "./Imprint";
import './css/lil-gui.css';

// The icon open/close the GUI
import svgSettingsOpenAsString from './icons/settings/open.svg?raw';
import svgSettingsCloseAsString from './icons/settings/close.svg?raw';

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
class Settings {
  #captureFolder: any;
  #showcaseFolder: GUI;
  #hidden: boolean;
  #gui: GUI;
  #guiIcon: HTMLElement;
  #guiCloseIcon: HTMLElement;
  static addRadioButtonsFolder(
    parent: GUI,
    folderName: string,
    object,
    options,
    onChange = (obj, prop, index) => { }
  ) {
    // Create the folder
    const folder = parent.addFolder(folderName);
    Settings.addRadioButtons(folder, object, options, onChange);
    return folder;
  }

  static addRadioButtons(
    parent: GUI,
    object: any,
    options,
    onChange = (obj, prop, index) => { }
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
  }
  
  constructor() {
    this.#gui = new GUI();
    this.#gui.domElement.id = "gui";

    this.createSettingsIcon();
    this.createShowHideListener();

    this.createShowcaseFolder();
    this.createNecklaceFolder();
    this.createViewFolder();
    this.createCaptureFolder();
  }

  createSettingsIcon() {
    const div = document.createElement('DIV');
    div.innerHTML = svgSettingsOpenAsString + svgSettingsCloseAsString;
    this.#guiIcon = div.querySelector('#settings-icon') as HTMLElement;
    this.#guiCloseIcon = div.querySelector('#settings-close-icon') as HTMLElement;
    this.#guiIcon.classList.add('show');
    this.#gui.hide();
    this.#gui.domElement.insertAdjacentElement('beforeBegin', this.#guiIcon);
    this.#guiIcon.insertAdjacentElement('afterEnd', this.#guiCloseIcon);
    new ClassMutationObserver(this.#gui.domElement, (value: MutationRecord, index: number | undefined) => {
      const div = value.target as HTMLDivElement;
      if (index === 0 && !div?.classList.contains('transition') && div?.classList.contains('closed')) {
        this.#gui.hide();
        this.#gui.close();
        this.toggleSettings();
      }
    });
    // Toggle settings-icon, settings-close-icon, show and open GUI
    this.#guiIcon?.addEventListener('click', () => {
      this.toggleSettings()
      this.#gui.show();
      this.#gui.open();
    });
    // Toggle settings-icon, settings-close-icon, hide GUI
    this.#guiCloseIcon?.addEventListener('click', () => {
      this.#gui.$title.click();
    });
  }

  toggleSettings() {
    this.#guiIcon.classList.toggle('show');
    this.#guiCloseIcon.classList.toggle('show');
  }

  createShowHideListener(): void {
    window.addEventListener('keydown', (e) => {
      if (e.key === "h" || e.key === "H") {
        this.#hidden ? this.#gui.show() : this.#gui.hide();
        this.#hidden = !this.#hidden;
      }
    })
  }

  createShowcaseFolder(): void {
    this.#showcaseFolder = Settings.addRadioButtonsFolder(
      this.#gui,
      `Showcase: ${SETTINGS.radio}`,
      SETTINGS.radio,
      MODES,
      (object, property, index) => {
        SETTINGS.int_mode = index;
        Events.dispatchEvent(Events.CREATE_SPHERE);
        this.#showcaseFolder.title(`Showcase: ${MODES[index]}`);
        this.#showcaseFolder.close();
      }
    );
    this.#showcaseFolder.close();
  }

  createNecklaceFolder() {
    const folder = this.#gui.addFolder("Necklace");
    folder
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
        Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
      });
    const configurationController = folder
      .add(
        SETTINGS.necklace,
        "configuration",
        0,
        2 ** SETTINGS.necklace.number_of_jewels - 1,
        1
      )
      .name("Configuration")
      .onChange(() =>
        Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER)
      );
    folder
      .add(SETTINGS.necklace, "string")
      .name("String")
      .onChange(() =>
        Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_STRING)
      );
    folder
      .add(SETTINGS.necklace, "discrete")
      .name("Discrete")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.necklace, "show_solution_band")
      .name("Solution Band")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.necklace, "show_solutions")
      .name("Solutions")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.necklace, "epsilon", 0, 0.15)
      .name("epsilon")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder.close();
  }

  createViewFolder() {
    const folder = this.#gui.addFolder("View");
    folder
      .add(SETTINGS.view, "show_single_thiefs_region")
      .name(`Single Thief's Area`)
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.view, "axes_visible")
      .name("Axes")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder
      .add(SETTINGS.view, "mesh_visible")
      .name("Mesh")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder
      .add(SETTINGS.view, "faces_visible")
      .name("Faces")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder.close();
    this.createSphereSubFolder(folder);
    this.createControlsSubFolder(folder);
    this.createColorSubFolder(folder);
    this.createAnimationSubFolder(folder);
  }

  createSphereSubFolder(parent) {
    const folder = parent.addFolder("Sphere");
    folder
      .add(SETTINGS.sphere, "radius", 1, 50, 1)
      .name("Radius")
      .onChange(() => Events.dispatchEvent(Events.CREATE_SPHERE));
    folder
      .add(SETTINGS.sphere, "offset_octant", 0.0, 5.0, 0.1)
      .name("Octant Offset")
      .onChange(() => Events.dispatchEvent(Events.CREATE_SPHERE));
    folder
      .add(SETTINGS.sphere, "use_bad_on_sphere_check")
      .name("Bad Check")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.sphere, "show_borsuk_ulam_proof_shape")
      .name("Borsuk-Ulam Proof")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.sphere, "segments", 3, 511, 1)
      .name("Segments")
      .onChange(() => Events.dispatchEvent(Events.CREATE_SPHERE));
    folder.close();
  }

  createControlsSubFolder(parent) {
    const folder = parent.addFolder("Other Controls");
    folder
      .add(SETTINGS.view, "stats_monitor_visible")
      .name(`Monitor`)
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder
      .add(SETTINGS.view, "necklace_visible")
      .name(`Necklace`)
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder
      .add(SETTINGS.view, "gauge_visible")
      .name(`Gauge`)
      .onChange(() => Events.dispatchEvent(Events.UPDATE_VISIBLE));
    folder.close();
  }
  createColorSubFolder(parent) {
    const folder = parent.addFolder("Color");
    folder
      .add(SETTINGS.color, "scale_red", 0.0, 1.0)
      .name("Red")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.color, "scale_green", 0.0, 1.0)
      .name("Green")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.color, "scale_blue", 0.0, 1.0)
      .name("Blue")
      .onChange(() => Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL));
    folder
      .add(SETTINGS.color, "alpha", 0.0, 1.0)
      .name("Alpha")
      .onChange(() => Events.dispatchEvent(Events.CREATE_SPHERE));
    folder.close();
  }

  createAnimationSubFolder(parent) {
    const folder = parent.addFolder("Animation");
    const MAX_ROT = 0.5;
    folder.add(SETTINGS.animation, "run").name("Rotate [Hz]").listen();
    folder
      .add(SETTINGS.animation, "rotation_x", -MAX_ROT, MAX_ROT, 0.1)
      .name("X")
      .listen();
    folder
      .add(SETTINGS.animation, "rotation_y", -MAX_ROT, MAX_ROT, 0.1)
      .name("Y")
      .listen();
    folder
      .add(SETTINGS.animation, "rotation_z", -MAX_ROT, MAX_ROT, 0.1)
      .name("Z")
      .listen();
    folder.add(SETTINGS.animation, "reset_speed").name("Reset Rotation");
    folder.close();
  }

  createCaptureFolder(): void {
    const folder = this.#gui.addFolder("Screen capture");

    // Configure imprint
    const imprint = new Imprint();
    const p = imprint.isAvailable();
    p.then((available) => {
      if (available) {
        this.#gui.add(SETTINGS, "imprint").name("Imprint");
      }
    });
    folder.close();
    this.#captureFolder = folder;
  }

  get captureFolder() {
    return this.#captureFolder;
  }
}

function resetAnimation(): void {
  SETTINGS.animation.trigger_reset = true;
  SETTINGS.animation.run = false;
  SETTINGS.animation.rotation_x = 0;
  SETTINGS.animation.rotation_y = 0;
  SETTINGS.animation.rotation_z = 0;
}

export { EPS, EPS_SQ, MAX_JEWELS, SETTINGS, Settings };
