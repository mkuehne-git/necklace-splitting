export enum Events {
  SETTINGS_CHANGED = "settings-changed",
  CHANGE_THEME = "change-theme",
  THEME_CHANGED = "theme-changed",

  SHOW_IMPRINT = "show-imprint",
  HIDE_IMPRINT = "hide-imprint",
  UPDATE_VISIBLE = "update-visible",
  MODEL_CHANGED = "model-changed",

  CREATE_SPHERE = "create-sphere",
  SET_NECKLACE_CONFIGURATION_BY_NUMBER = "necklace-configuration-by-number",
  SET_NECKLACE_CONFIGURATION_BY_STRING = "necklace-configuration-by-string",
  UPDATE_SPHERE_MATERIAL = "update-material",
  NECKLACE_CUT = "necklace-cut",
  /** SETTINGS.sphere.morph changed: by the view switcher's animation or its slider. */
  MORPH_CHANGED = "morph-changed",
  /** SETTINGS.view.input changed: the pointer on the sphere or the necklace's handles set the cuts. */
  INPUT_CHANGED = "input-changed",
  /** A handle was let go or a part given to the other thief: the sphere turns to show the point if it is out of sight. */
  SHOW_CUT = "show-cut",
  SCREEN_CAPTURE = "screen-capture",
  SHOW_CHANGELOG = "show-changelog",
  HIDE_CHANGELOG = "hide-changelog",
  SHOW_INFO = "show-info",
  HIDE_INFO = "hide-info",
}

export namespace Events {
  export function dispatchEvent(event: Events): void {
    const evt = new Event(event.toString(), { bubbles: true });
    document.body.dispatchEvent(evt);
  }
}
