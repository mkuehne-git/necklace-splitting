import '../css/settings.css';
import { Events } from "../Enums";
import { applySettings, collectSettings, persistentState } from "./PersistentState";
import { SettingsButton } from "./SettingsButton";
import { SettingsPanel } from "./SettingsPanel";
import { buildSettingsPanel } from "./settingsSections";
import type { Control } from "./settingsControls";
import { SETTINGS, resetSolutionHints } from "./settingsValues";
import { rollConfiguration } from "../necklace/roll";

/**
 * The settings: applies the remembered ones to SETTINGS (settingsValues.ts),
 * then builds the settings panel and its gear button. The views read SETTINGS
 * and follow the events the controls dispatch.
 */
class Settings {
  #controls: Control[];

  constructor() {
    // The remembered settings, before anything reads them.
    applySettings(persistentState.state.settings);
    const panel = new SettingsPanel(document.body);
    new SettingsButton(panel);
    this.#controls = buildSettingsPanel(panel);
    // Entering or leaving the game hides or restores the solutions.
    document.body.addEventListener(Events.INPUT_CHANGED.toString(), () => this.update());
    document.body.addEventListener(Events.ROLL_NECKLACE.toString(), () => this.roll());
  }

  /**
   * The dice: a random necklace with the jewels set, by number, replacing one
   * given by text, and a new game, which hides the solutions again.
   */
  private roll(): void {
    const necklace = SETTINGS.necklace;
    const configuration = rollConfiguration(necklace.number_of_jewels, necklace.configuration);
    if (configuration === undefined) {
      return;
    }
    necklace.configuration = configuration;
    resetSolutionHints();
    persistentState.update({ necklaceSource: "number", settings: collectSettings() });
    Events.dispatchEvent(Events.SET_NECKLACE_CONFIGURATION_BY_NUMBER);
    this.update();
  }

  /** Shows values that changed elsewhere. */
  update(): void {
    this.#controls.forEach((control) => control.update());
  }
}

export { Settings };
