/**
 * Some URLs:
 * https://en.wikipedia.org/wiki/Necklace_splitting_problem
 * https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem
 * 3blue1brown video https://youtu.be/yuVqxCSsE7c
 */


// To configure settings
import { EPS_SQ, SETTINGS, Settings } from './Settings.js';
import { Events } from "./Enums";

import { ScreenCapture } from './ScreenCapture';
import { Sphere } from './Sphere';
import { Necklace } from './Necklace';
import NecklaceModel from './NecklaceModel';

// The UI to configure the settings.
const settings = new Settings();
const model = new NecklaceModel();
const sphere = new Sphere(model);
const necklace = new Necklace(model);


document.body.addEventListener(Events.THEME_CHANGED.toString(), onThemeChange);

function onThemeChange() {
  const oldThemeStyle = SETTINGS.view.dark_theme ? 'light' : 'dark';
  const newThemeStyle = SETTINGS.view.dark_theme ? 'dark' : 'light';
  if (document.body.classList.contains(oldThemeStyle)) {
    document.body.classList.remove(oldThemeStyle);
  }
  document.body.classList.add(newThemeStyle);
}
Settings.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
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