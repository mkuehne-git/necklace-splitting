/**
 * Some URLs:
 * https://en.wikipedia.org/wiki/Necklace_splitting_problem
 * https://en.wikipedia.org/wiki/Borsuk%E2%80%93Ulam_theorem
 * 3blue1brown video https://youtu.be/yuVqxCSsE7c
 */

import './css/style.css';
import '@fontsource/dejavu-sans';

// To configure settings
import { Settings } from './settings/Settings';
import { ThemesSwitcher } from './ui/ThemesSwitcher';
import { Events } from "./Enums";

import { ScreenCapture } from './ui/ScreenCapture';
import { initPwaUpdate } from './ui/PwaUpdate';
import { persistentState } from './settings/PersistentState';
import { Changelog } from './changelog/Changelog';
import { showWhatsNewOnce } from './changelog/WhatsNew';
import { Info } from './info/Info';
import { t } from './i18n';
import { Sphere } from './sphere/Sphere';
import { Necklace } from './necklace/Necklace';
import { NecklaceModel } from './necklace/NecklaceModel';


// The settings, remembered ones applied, and their panel: first, since the views read them.
new Settings();
const switcher = new ThemesSwitcher();
new Info();
const model = new NecklaceModel();
const sphere = new Sphere(model);
const necklace = new Necklace(model);

// The necklace as it was defined last: by the configuration number or by the text.
Events.dispatchEvent(persistentState.state.necklaceSource === 'string'
  ? Events.SET_NECKLACE_CONFIGURATION_BY_STRING
  : Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
sphere.render();
new ScreenCapture({
  All: document.body,
  Sphere: sphere.captureElement,
  Necklace: necklace.captureElement,
});

// The version label in the lower right corner opens the changelog.
const changelog = new Changelog();
const versionLabel = document.createElement('button');
versionLabel.type = 'button';
versionLabel.id = 'version-info';
versionLabel.textContent = `v${APP_VERSION}`;
versionLabel.title = t('version.title');
versionLabel.addEventListener('click', () => Events.dispatchEvent(Events.SHOW_CHANGELOG));
document.body.appendChild(versionLabel);
switcher.initTheme();
initPwaUpdate();
// The changes since the version seen last, once.
void showWhatsNewOnce(changelog, persistentState, APP_VERSION);


// Make empty module to allow top level await
export { };