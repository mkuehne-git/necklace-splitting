export enum Showcase {
  STOLEN_NECKLACE = 0,
  SHADER_LAMP,
  SPACE_COLOR,
  SINUSOID,
}

export enum Events {
  CREATE_SPHERE = "create-sphere",
  SET_NECKLACE_CONFIGURATION_BY_NUMBER = "necklace-configuration-by-number",
  SET_NECKLACE_CONFIGURATION_BY_STRING = "necklace-configuration-by-string",
  UPDATE_SPHERE_MATERIAL = "update-material",
  NECKLACE_CUT = "necklace-cut",
  UPDATE_VISIBLE = "update-visible",
  THEME_CHANGED = "theme-changed",
  MODEL_CHANGED = "model-changed",
  SHOW_IMPRINT = "show-imprint",
  HIDE_IMPRINT = "hide-imprint",
}

export namespace Events {
  export function dispatchEvent(event: Events): void {
    const evt = new Event(event.toString(), { bubbles: true });
    document.body.dispatchEvent(evt);
  }
}
