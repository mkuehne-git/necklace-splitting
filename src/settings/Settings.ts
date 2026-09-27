import '../css/settings.css';
import { applySettings, persistentState } from "./PersistentState";
import { SettingsButton } from "./SettingsButton";
import { SettingsPanel } from "./SettingsPanel";
import { buildSettingsPanel } from "./settingsSections";
import type { Control } from "./settingsControls";

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
  }

  /** Shows values that changed elsewhere. */
  update(): void {
    this.#controls.forEach((control) => control.update());
  }
}

export { Settings };
