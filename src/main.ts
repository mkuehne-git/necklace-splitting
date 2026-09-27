/**
 * Some URLs:
 * https://en.wikipedia.org/wiki/Necklace_splitting_problem
 * https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem
 * 3blue1brown video https://youtu.be/yuVqxCSsE7c
 */

import './css/style.css';
import '@fontsource/dejavu-sans';

// To configure settings
import { SETTINGS, Settings } from './settings/Settings';
import { ThemesSwitcher } from './ui/ThemesSwitcher';
import { Events } from "./Enums";

import { ScreenCapture } from './ui/ScreenCapture';
import { initPwaUpdate } from './ui/PwaUpdate';
import { persistentState } from './settings/PersistentState';
import { Sphere } from './sphere/Sphere';
import { Necklace } from './necklace/Necklace';
import { NecklaceModel } from './necklace/NecklaceModel';


// The UI to configure the settings.
const settings = new Settings();
const switcher = new ThemesSwitcher();
const model = new NecklaceModel();
const sphere = new Sphere(model);
const necklace = new Necklace(model);

// The necklace as it was defined last: by the configuration number or by the text.
Events.dispatchEvent(persistentState.state.necklaceSource === 'string'
  ? Events.SET_NECKLACE_CONFIGURATION_BY_STRING
  : Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
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
switcher.initTheme();
initPwaUpdate();


// Make empty module to allow top level await
export { };