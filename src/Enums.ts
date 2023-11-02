export enum Showcase {
  STOLEN_NECKLACE = 0,
  SHADER_LAMP,
  SPACE_COLOR,
  SINUSOID,
}

export enum Events {
  SETTINGS_CHANGED = "settings-changed",
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
}

export namespace Events {
  export function dispatchEvent(event: Events): void {
    const evt = new Event(event.toString(), { bubbles: true });
    document.body.dispatchEvent(evt);
  }
}
