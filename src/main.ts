/**
 * Some URLs:
 * https://en.wikipedia.org/wiki/Necklace_splitting_problem
 * https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem
 * 3blue1brown video https://youtu.be/yuVqxCSsE7c
 */

import '@fontsource/dejavu-sans';

// To configure settings
import { SETTINGS, Settings } from './Settings';
import { ThemesSwitcher } from './ThemesSwitcher';
import { Events } from "./Enums";

import { ScreenCapture } from './ScreenCapture';
import { Sphere } from './Sphere';
import { Necklace } from './Necklace';
import { NecklaceModel } from './NecklaceModel';
import { SVGToggleButton } from './SVGToggleButton';


// The UI to configure the settings.
const settings = new Settings();
const switcher = await ThemesSwitcher.create();
const model = new NecklaceModel();
const sphere = new Sphere(model);
const necklace = new Necklace(model);

switcher.initTheme();
switcher.registerOnThemeChange(document.body);

Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
sphere.render();
const capture = new ScreenCapture(
  {
    folder: settings.captureFolder,
    property: SETTINGS.capture
  },
  {
    all: document.body,
    sphere: sphere.captureElement,
    necklace: necklace.captureElement
  });

// Version info before infoIcon
const span = document.createElement('SPAN');
span.setAttribute('id', 'version-info');
span.innerHTML = `v${APP_VERSION}`;
document.body.insertAdjacentElement('beforeend', span);


// Make empty module to allow top level await
export { };