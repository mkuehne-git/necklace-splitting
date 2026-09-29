import '../css/switcher.css';

import { Events } from "../Enums";
import { INPUTS, SETTINGS, type Input } from "../settings/settingsValues";
import { collectSettings, persistentState } from "../settings/PersistentState";
import { t, type MessageKey } from "../i18n";
import { icon as shapeIcon } from "../icons/shape/shapeIcon";
import { icon as pointerIcon } from "../icons/pointer/pointerIcon";
import { icon as cutIcon } from "../icons/cut/cutIcon";

const INPUT_BUTTONS: Record<Input, { label: MessageKey, svg: string }> = {
  Sphere: { label: "view.inputSphere", svg: pointerIcon.svg },
  Necklace: { label: "view.inputNecklace", svg: cutIcon.svg },
};

/** How long the morph between sphere and shape takes, in ms, all the way. */
const MORPH_DURATION = 1000;

const easeInOut = (x: number) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

/**
 * The buttons in the upper left corner, modeled on Climate Helix's scene
 * switcher. Two exclusive buttons choose what sets the cuts: the pointer on the
 * sphere or the handles on the necklace (SETTINGS.view.input, INPUT_CHANGED).
 * The Borsuk-Ulam toggle morphs the sphere into
 * the shape of g and back, and hides the necklace and the gauge while it is on,
 * which disables the input buttons: then the pointer sets the cuts;
 * the slider beside it, shown with the shape, scrubs the morph by hand. Both
 * write SETTINGS.sphere.morph and dispatch MORPH_CHANGED, which the sphere follows.
 */
class ViewSwitcher {
  #inputButtons = new Map<Input, HTMLButtonElement>();
  #shapeButton: HTMLButtonElement;
  #slider: HTMLInputElement;
  /** The running morph animation's frame request. */
  #frame: number | undefined;

  constructor(container: Element = document.body) {
    SETTINGS.sphere.morph = SETTINGS.sphere.show_borsuk_ulam_proof_shape ? 1 : 0;

    const div = document.createElement("div");
    div.className = "view-switcher";
    const inputs = document.createElement("div");
    inputs.className = "view-inputs";
    inputs.setAttribute("role", "group");
    for (const input of INPUTS) {
      const button = this.createButton(t(INPUT_BUTTONS[input].label), INPUT_BUTTONS[input].svg, () => this.selectInput(input));
      this.#inputButtons.set(input, button);
      inputs.appendChild(button);
    }
    this.#shapeButton = this.createButton(t("view.borsukUlam"), shapeIcon.svg, () => this.toggleShape());
    this.#slider = document.createElement("input");
    this.#slider.type = "range";
    this.#slider.className = "view-morph";
    this.#slider.min = "0";
    this.#slider.max = "1";
    this.#slider.step = "0.01";
    this.#slider.setAttribute("aria-label", t("view.morph"));
    this.#slider.title = t("view.morph");
    this.#slider.addEventListener("input", () => {
      this.stopMorph();
      this.setMorph(Number(this.#slider.value));
    });
    const separator = document.createElement("span");
    separator.className = "view-separator";
    div.append(inputs, separator, this.#shapeButton, this.#slider);
    container.appendChild(div);
    this.update();
  }

  private createButton(label: string, svg: string, onClick: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "view-button";
    button.setAttribute("aria-label", label);

    const template = document.createElement("template");
    template.innerHTML = svg;
    const icon = template.content.querySelector("svg");
    if (icon) {
      icon.classList.add("view-icon");
      button.appendChild(icon);
    }

    const tooltip = document.createElement("span");
    tooltip.className = "view-tooltip";
    tooltip.textContent = label;
    button.appendChild(tooltip);

    button.addEventListener("click", onClick);
    return button;
  }

  /** Chooses what sets the cuts, and remembers it. */
  private selectInput(input: Input): void {
    if (input === SETTINGS.view.input) {
      return;
    }
    SETTINGS.view.input = input;
    persistentState.update({ settings: collectSettings() });
    this.update();
    Events.dispatchEvent(Events.INPUT_CHANGED);
  }

  /** Switches the Borsuk-Ulam shape on or off, remembers it, and morphs there. */
  toggleShape(): void {
    const shape = !SETTINGS.sphere.show_borsuk_ulam_proof_shape;
    SETTINGS.sphere.show_borsuk_ulam_proof_shape = shape;
    persistentState.update({ settings: collectSettings() });
    // The sphere builds the shape if it lacks it; the necklace and the gauge hide or show.
    Events.dispatchEvent(Events.UPDATE_SPHERE_MATERIAL);
    this.update();
    // With the shape, the pointer sets the cuts whatever the mode; without it, the mode applies again.
    Events.dispatchEvent(Events.INPUT_CHANGED);
    this.morphTo(shape ? 1 : 0);
  }

  /** Animates the morph from where it is to `target`, eased, in up to MORPH_DURATION. */
  private morphTo(target: number): void {
    this.stopMorph();
    const from = SETTINGS.sphere.morph;
    const duration = MORPH_DURATION * Math.abs(target - from);
    const start = performance.now();
    const step = (now: DOMHighResTimeStamp) => {
      const progress = duration > 0 ? Math.min(1, (now - start) / duration) : 1;
      this.setMorph(from + (target - from) * easeInOut(progress));
      this.#frame = progress < 1 ? requestAnimationFrame(step) : undefined;
    };
    this.#frame = requestAnimationFrame(step);
  }

  private stopMorph(): void {
    if (this.#frame !== undefined) {
      cancelAnimationFrame(this.#frame);
      this.#frame = undefined;
    }
  }

  private setMorph(value: number): void {
    SETTINGS.sphere.morph = value;
    this.#slider.value = String(value);
    Events.dispatchEvent(Events.MORPH_CHANGED);
  }

  private update(): void {
    const shape = SETTINGS.sphere.show_borsuk_ulam_proof_shape;
    this.#inputButtons.forEach((button, input) => {
      const active = input === SETTINGS.view.input;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("active", active);
      button.disabled = shape;
    });
    this.#shapeButton.setAttribute("aria-pressed", String(shape));
    this.#shapeButton.classList.toggle("active", shape);
    this.#slider.hidden = !shape;
    this.#slider.value = String(SETTINGS.sphere.morph);
  }
}

export { ViewSwitcher };
